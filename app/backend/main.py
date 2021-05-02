import graphene
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.backend.utils import CustomGraphQLApp
from app.backend.schema import Query, Mutation
from app.backend import models
from app.backend.database import engine


models.Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_route(
    "/graphql", CustomGraphQLApp(schema=graphene.Schema(query=Query, mutation=Mutation))
)
