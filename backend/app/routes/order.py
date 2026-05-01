from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.order import Order
import shutil, os
from app.models.medicine import Medicine
from fastapi import HTTPException
router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/orders")
def create_order(
    name: str = Form(...),
    medicine: str = Form(...),
    quantity: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
 
    # 🔥 FIND MEDICINE
    med = db.query(Medicine).filter(Medicine.name == medicine).first()

    if not med:
        raise HTTPException(status_code=404, detail="Medicine not found")

    # 🔥 CHECK STOCK
    if med.stock < quantity:
        raise HTTPException(
            status_code=400,
            detail=f"Not enough stock. Available: {med.stock}"
        )

    # 🔥 REDUCE STOCK
    med.stock -= quantity

    # 🔥 SAVE FILE
    file_path = f"{UPLOAD_FOLDER}/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 🔥 SAVE ORDER
    new_order = Order(
        name=name,
        medicine=medicine,
        quantity=quantity,
        prescription=file.filename
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return {"message": "Order placed & stock updated"}