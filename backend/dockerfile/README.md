docker build --progress=plain -t angular .
docker tag angular localhost:9000/angular:latest
docker push localhost:9000/angular:latest