package entity

import (
	"time"

	"gorm.io/gorm"
)

type Maintain struct {
	gorm.Model
	Title      string `valid:"required~กรุณาใส่หัวข้อเรื่อง."`
	Details    string `valid:"required~กรุณาใส่รายละเอียด."`
	Image      string
	Location   string `valid:"required~กรุณาใส่สถานที่."`
	Contact    string    `valid:"matches(^[0]\\d{9}$)~เบอร์โทรศัพท์ไม่ถูกต้อง."`
	Date       time.Time `valid:"required~กรุณาใส่วันที่แจ้งซ่อม."`
	Annotation string
	Age        int8 `valid:"required,range(1|120)~อายุควรอยู่ระหว่าง1-120."`

	UserID *uint
	User   User `gorm:"references:id" valid:"-"`

	MaintainStatusID *uint
	MaintainStatus   MaintainStatus `gorm:"references:id"`

	MaintainTypeID *uint
	MaintainType   MaintainType `gorm:"references:id"  valid:"required~กรุณาเลือกประเภทแจ้งซ่อม."`

	AdminID *uint
	Admin Admin `gorm:"references:id" valid:"-"`
}
