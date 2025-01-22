# Natural Language Processing

[![Build](/../../actions/workflows/main.yml/badge.svg)](/../../actions/workflows/main.yml)

Automatic language identification using n-gram based models.


## Repository Layout

*   `corpus/` – Training data.
*   `resources/` – Scripts and resources used for building the website.


## Training Corpus

In its current version the n-gram models are based directly on ASCII characters; all invalid characters will be ignored.

The training corpus used is 30k sentences, or about 4 megabytes of text, for each language (Danish, English, French, German, Swedish) which may not yield accurate results.


## License

This project is free software; you can redistribute it and/or modify it under
the terms of the MIT license.
See [LICENSE](LICENSE) for details.