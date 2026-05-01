from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.medicine import Medicine
from app.schemas.medicine import MedicineCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/medicines")
def add_medicine(medicine: MedicineCreate, db: Session = Depends(get_db)):
    new_med = Medicine(**medicine.dict())

    db.add(new_med)
    db.commit()
    db.refresh(new_med)

    return new_med

@router.get("/medicines")
def get_medicines(db: Session = Depends(get_db)):
    return db.query(Medicine).all()