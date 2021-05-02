from graphene_pydantic import PydanticInputObjectType, PydanticObjectType
from pydantic import BaseModel


class PostModel(BaseModel):
    id: int
    title: str


class PostGrapheneModel(PydanticObjectType):
    class Meta:
        name = "Post"
        model = PostModel


class PostGrapheneInputModel(PydanticInputObjectType):
    class Meta:
        name = "PostInput"
        model = PostModel
        exclude_fields = "id"
