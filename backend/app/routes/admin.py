from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal

from app.models.patient import Patient
from app.models.medicine import Medicine
from app.models.order import Order
from app.models.delivery import Delivery

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/admin/stats")
def get_stats(db: Session = Depends(get_db)):
    return {
        "patients": db.query(Patient).count(),
        "medicines": db.query(Medicine).count(),
        "orders": db.query(Order).count(),
        "deliveries": db.query(Delivery).count()
    }