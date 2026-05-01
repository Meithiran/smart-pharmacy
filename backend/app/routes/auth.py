from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Register
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(
        username=user.username,
        password=user.password,
        role="admin"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "username": new_user.username,
        "role": new_user.role
    }

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(
        User.username == user.username,
        User.password == user.password
    ).first()

    if not db_user:
        from fastapi import HTTPException
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "role": db_user.role,
        "username": db_user.username
    }