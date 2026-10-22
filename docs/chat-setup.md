# Portfolio chat setup (Slack, free plan)

Visitors type in the "Chat with me" widget. Each conversation becomes a thread in a Slack
channel. You reply **inside that thread** from the Slack app (phone or desktop) and the reply
shows up in the visitor's chat within a few seconds.

Until the three environment variables below are set, the widget shows "Live chat isn't
available right now" with your email instead, so nothing breaks.

## 1. Workspace and channel

1. Use any Slack workspace you own, or create a free one at https://slack.com/get-started.
2. Create a channel, for example `#portfolio-chat`.

## 2. Create the Slack app (2 minutes)

1. Go to https://api.slack.com/apps and choose **Create New App**, then **From a manifest**.
2. Pick your workspace and paste this manifest:

```yaml
display_information:
  name: Portfolio Chat
  description: Relays chats from rahulvishnuvardhana.vercel.app
features:
  bot_user:
    display_name: Portfolio Chat
    always_online: true
oauth_config:
  scopes:
    bot:
      - chat:write
      - channels:history
      - groups:history
      - users:read
settings:
  org_deploy_enabled: false
  socket_mode_enabled: false
  token_rotation_enabled: false
```

3. Click **Install to Workspace**, then copy the **Bot User OAuth Token** (starts with `xoxb-`)
   from **OAuth & Permissions**.
4. In `#portfolio-chat`, type `/invite @Portfolio Chat`.
5. Copy the channel ID: open the channel name, then **View channel details**; the ID
   (starts with `C`) is at the bottom.

## 3. Add the secrets to Vercel

Vercel, project `portfolio`, **Settings**, **Environment Variables** (Production):

| Name | Value |
|---|---|
| `SLACK_BOT_TOKEN` | the `xoxb-...` token |
| `SLACK_CHANNEL_ID` | the `C...` channel ID |
| `CHAT_SECRET` | any long random string (it signs each visitor's chat link) |
| `SLACK_OWNER_ID` | optional: your Slack member ID (starts with `U`) for the online dot |

Generate a `CHAT_SECRET` in PowerShell:

```powershell
-join ((48..57)+(65..90)+(97..122) | Get-Random -Count 48 | ForEach-Object {[char]$_})
```

Then redeploy (Deployments, latest, **Redeploy**). For local testing, put the same values in
`.env.local`. Set `SLACK_OWNER_ID` too: without it, any workspace member's thread reply would be
relayed.

## 4. On your phone (notifications with sound)

Every chat message the bot posts @mentions you (`SLACK_OWNER_ID`), so Slack always sends a push,
including a visitor's follow-ups inside a thread you have not replied to yet.

1. Install Slack and sign in to the PortfolioChat workspace with the email you used to create it
   (it can differ from your other workspaces). Switch workspaces from the Home tab by swiping right.
2. Profile photo, **Notifications**: turn on **Mobile push notifications**, and set mobile timing
   to notify **as soon as messages are sent** (by default Slack waits until you are idle on desktop).
3. In `#portfolio-chat`, tap the channel name, **Notifications**, **All new messages**.
4. Sound: on iPhone, iOS Settings, Slack, Notifications, enable Sounds (and choose a sound in Slack
   notification settings); on Android, Slack notification settings, or Android Settings, Apps,
   Slack, Notifications, and set the category's sound and importance to Alert.

## Online dot (optional)

The widget shows a green dot and "Online now" while your Slack status is active, like
LinkedIn. It needs the `users:read` scope (in the manifest above) and `SLACK_OWNER_ID`.
Find your member ID in Slack: click your profile photo, then **Profile**, then the
three-dot menu, then **Copy member ID**. Slack marks you away after about 10 minutes of
inactivity on desktop, or when the mobile app is closed; set yourself to away from your
profile menu whenever you do not want to look online.

## How replying works

- Each visitor gets their own thread. The first message shows a card with their **name**
  (required), optional **email** and **company / role**, approximate location and the site
  they came from. All of it is self-reported, so treat it as unverified.
- Reply **in the thread** under it. Messages posted outside the thread are not sent to anyone.
- Only **your** replies (from `SLACK_OWNER_ID`) are shown to the visitor. Replies from anyone
  else in the workspace stay in Slack.
- Start a reply with `!note` to keep it private, for example `!note check them on LinkedIn`.
- Follow-up messages from the same visitor arrive in the same thread.

## Limits and safety

- Isolation: each visitor holds an HMAC-signed token for exactly one thread, sent in a header
  (never the URL). Forged or altered tokens are rejected, so nobody can read or post into
  another visitor's conversation.
- Visitor text is posted as Slack `plain_text` with `parse: none` and `link_names: false`, so it
  cannot trigger `@channel`, mentions, links or formatting. Control and bidi characters are
  stripped.
- Rate limits (per server instance): 3 new conversations per IP per hour, 20 messages per IP and
  15 per conversation per 10 minutes, 40 new conversations per hour overall, and 40 polls per
  conversation per minute. Thread reads are cached for 4 seconds, so polling cannot exhaust the
  Slack API quota. On Vercel the client IP comes from the platform and cannot be spoofed.
- Requests over 8 KB, cross-origin browser posts, malformed JSON and bad emails are rejected; a
  hidden honeypot field silently drops simple bots.
- Slack free plan keeps 90 days of history. If a visitor returns after their thread has aged
  out, their next message starts a new thread automatically.
- The widget polls every 5 seconds while open and every 45 seconds while closed, and backs off
  when the server asks it to.
- Optional extra protection: Vercel Firewall allows one rate-limit rule on Hobby projects
  (rate limiting is a priced feature), for example on `POST /api/chat`.
