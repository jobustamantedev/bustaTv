from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.channel import Channel
from app.schemas.channel import ChannelCreate, ChannelUpdate

def get_channels(
    db: Session,
    active_only: bool = True,
    category_slug: str = None
):
    query = db.query(Channel)

    if active_only:
        query = query.filter(Channel.is_active == True)

    if category_slug:
        from app.models.category import Category
        query = query.join(Category).filter(Category.slug == category_slug)

    return query.all()

def get_channel(db: Session, channel_id: int):
    return db.query(Channel).filter(Channel.id == channel_id).first()

def get_channel_by_slug(db: Session, slug: str):
    return db.query(Channel).filter(Channel.slug == slug).first()

def create_channel(db: Session, channel: ChannelCreate):
    db_channel = Channel(**channel.model_dump())
    db.add(db_channel)
    db.commit()
    db.refresh(db_channel)
    return db_channel

def update_channel(db: Session, channel_id: int, updates: ChannelUpdate):
    db_channel = db.query(Channel).filter(Channel.id == channel_id).first()
    if not db_channel:
        return None

    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_channel, key, value)

    db.add(db_channel)
    db.commit()
    db.refresh(db_channel)
    return db_channel

def delete_channel(db: Session, channel_id: int):
    db_channel = db.query(Channel).filter(Channel.id == channel_id).first()
    if not db_channel:
        return False

    db.delete(db_channel)
    db.commit()
    return True
