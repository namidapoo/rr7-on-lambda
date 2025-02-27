FROM public.ecr.aws/docker/library/node:20-slim

# Lambda Web Adapter を反映させます
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter

ENV PORT=3000
WORKDIR "/var/task"

ADD build/server/ /var/task/

CMD ["npm", "run", "start"]
