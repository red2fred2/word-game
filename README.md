# Word Game
A boggle-like game run as a web app.

### Requirements
* Node
* Docker
* Docker Buildx

### Installing dependencies
```npm install -D```

### Building
1. ```gulp```
2. ```rollup -c```
3. ```docker buildx build -t red2fred2/word-game .```

or run the build script
```build.sh```

### Running
```docker run -it -d -p 7070:7070/tcp --name word-game red2fred2/word-game```

or run the run script
```run.sh```
