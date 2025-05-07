# Word Game
A boggle-like game run as a web app.

[![Demo video](https://github.com/red2fred2/word-game/raw/refs/heads/main/video preview.jpg)](https://github.com/red2fred2/word-game/raw/refs/heads/main/video.mp4)

### Requirements
* Node
* Docker
* Docker Buildx
* Rust
* Wasm-pack

### Installing dependencies
```npm install -D```

### Building
1. ```wasm-pack build --target web```
2. ```gulp```
3. ```rolldown -c```
4. ```cp pkg/*.wasm output/frontend/```

or run the build script
```build.sh```

### Running
1. ```docker compose up -d --build```

or run the run script
```run.sh```

### Development
1. ```rolldown -wc```
2. ```docker compose watch```

### Generating documentation
1. ```typedoc --entryPointStrategy Expand src```
2. ```cargo doc```
