from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    priority = Column(String(10))
    status = Column(String(20), default="PENDING")
    created_at = Column(DateTime, default=datetime.utcnow)
    prescription = Column(String(200))

    