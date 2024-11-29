# Grasp the grasp out of your Twitch chat!

This web application helps grasping the most relevant information out of a Twitch chat and is especially useful for mid to large sized chats. *This application is an ongoing project, a [perpetual beta](https://en.wikipedia.org/wiki/Perpetual_beta). You can accompany the development of this tool on the [dialogikTV Twitch channel](https://www.twitch.tv/dialogikTV).*

## Features

* Automatic relevance detection
  * Broadcaster @mentions
  * First two messages of each chat user (you don't want to miss new chatters!)
  * Greeting formulas like "good morning", "good evening" etc.
  * Shorties like "hi", "hey" or "hello"
  * Messages from roles like Mods, Subs or VIPs
* Message picking (add/remove to pick list using Alt+Click/Ctrl+Click)
* Mark messages as read/unread using Left click
* Userlist with chat message count
* Search messages by username (Ctrl+Click on the search input field to clear user search)
* [Multi language support](#multi-language-support) (DE/EN/FR/ES/IT/PL)

## Basic concept

You can manage your (or any) Twitch chat messages in three columns:

### 1. Chat (left)

All chat messages (currently limited to youngest 100 messages for performance reasons).

### 2. Grasp (center)

The automatically detected and grasped messages. These can be filtered using checkboxes or keyboard shortcuts.

### 3. Picks (right)

* Add messages to picks using Alt+Click from Chat or Grasp columns
* Remove messages using Ctrl+Click

## Use grasp for your own channel

Simply visit the application and enter your Twitch channel name. You can also pass `channel=<your_channel>` to the URL, e.g. [`https://dialogik-tv.github.io/grasp?channel=dialogikTV`](https://dialogik-tv.github.io/grasp?channel=dialogikTV).

## Multi language support

This application supports multiple languages for the shorty and haystack/needle relevance concept. Language data is organized in [`dialogik-tv/grasp-lang`](https://github.com/dialogik-tv/grasp-lang).

Currently supported languages:

* `de` – German
* `en` – English
* `fr` – French
* `es` – Spanish
* `it` – Italian
* `pl` – Polish

Language(s) can be set by passing `&lang=<lang1|lang2|...>`. Examples:

```
https://dialogik-tv.github.io/grasp?channel=dialogikTV&lang=fr
https://dialogik-tv.github.io/grasp?channel=dialogikTV&lang=es|it
```

If no lang parameter is passed, `de` is the default language pack.

## Keyboard shortcuts

### Toggle filter settings

* `Ctrl`+`M` – Toggle mods
* `Ctrl`+`S` – Toggle subs
* `Ctrl`+`V` – Toggle VIPs
* `M` – Toggle @mentions
* `Ctrl`+`H` – Toggle haystack needles
* `H` – Toggle shorties

### Toggle chat/userlist visibility

* `C` – Toggle main chat visibility
* `U` – Toggle userlist visibility

# Support

This is a [dialogikTV](https://dialogik.tv) project. You can contact the author via [Twitter (@dialogikTV)](https://twitter.com), [Discord](http://discord.dialogik.tv) or on the [Twitch live channel](https://www.twitch.tv/dialogikTV).

# Contribute

See our [contribution guide](doc/CONTRIBUTE.md) if you want to contribute to this project.