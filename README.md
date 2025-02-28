# Natural Language Processing

[![Build](/../../actions/workflows/main.yml/badge.svg)](/../../actions/workflows/main.yml)

Automatic language identification using n-gram based models.


## Repository Layout

*   `corpus/` – Training data.
*   `resources/` – Scripts and resources used for building the website.


## Training Corpus

In its current version, the n-gram models are based directly on ASCII characters; all other characters will be ignored.

The training corpus used consists of 30k sentences for each language. The dataset size and quality may not yield highly accurate results.
The supported languages are:

*   Danish (da) 🇩🇰
*   English (en) 🇬🇧
*   French (fr) 🇫🇷
*   German (de) 🇩🇪
*   Swedish (sv) 🇸🇪
*   Spanish (es) 🇪🇸
*   Italian (it) 🇮🇹
*   Dutch (nl) 🇳🇱
*   Portuguese (pt) 🇵🇹
*   Norwegian (no) 🇳🇴
*   Finnish (fi) 🇫🇮
*   Romanian (ro) 🇷🇴
*   Hungarian (hu) 🇭🇺
*   Turkish (tr) 🇹🇷
*   Indonesian (id) 🇮🇩


## License

This project is free software; you can redistribute it and/or modify it under the terms of the MIT license.
See [LICENSE](LICENSE) for details.