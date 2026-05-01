from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.delivery import Delivery
from app.schemas.delivery import DeliveryCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/deliveries")
def assign_delivery(delivery: DeliveryCreate, db: Session = Depends(get_db)):
    new_delivery = Delivery(**delivery.dict())

    db.add(new_delivery)
    db.commit()
    db.refresh(new_delivery)

    return new_delivery

@router.get("/deliveries")
def get_deliveries(db: Session = Depends(get_db)):
    return db.query(Delivery).all()