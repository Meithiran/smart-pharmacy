from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True)  # ✅ FIX
    password = Column(String(100))                           # ✅ FIX
    role = Column(String(50), default="user")                # ✅ FIX