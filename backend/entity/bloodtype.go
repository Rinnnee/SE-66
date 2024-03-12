package entity

import "gorm.io/gorm"

type BloodType struct {
	gorm.Model
	BloodTypeName string

	Users []User `gorm:"foreignKey:BloodTypeID"`
}

//เพิ่มแล้วนะ
