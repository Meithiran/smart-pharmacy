from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.patient import Patient
from app.schemas.patient import PatientCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/patients")
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    is_elderly = patient.age >= 60

    new_patient = Patient(**patient.dict(), is_elderly=is_elderly)

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return new_patient
@router.get("/patients")
def get_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()
