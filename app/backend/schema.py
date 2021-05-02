from fastapi import Depends
import graphene

from app.backend.serializers import PostGrapheneInputModel, PostGrapheneModel
from app.backend.database import SessionLocal, engine
from app.backend import models


db = SessionLocal()


class Query(graphene.ObjectType):
    user_agent = graphene.String()

    def resolve_user_agent(self, info):
        """
        Return the User-Agent of the incoming request.
        """
        request = info.context["request"]
        return request.headers.get("User-Agent", "<unknown>")

    posts = graphene.List(PostGrapheneModel)

    def resolve_posts(parent, info):
        return db.query(models.Post).all()


class CreatePost(graphene.Mutation):
    class Arguments:
        post_details = PostGrapheneInputModel()

    Output = PostGrapheneModel

    def mutate(parent, info, post_details):
        db_post = models.Post(title=post_details.title)
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post


class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()
