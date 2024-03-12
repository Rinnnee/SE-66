package entity

import "gorm.io/gorm"

type Admin struct {
	gorm.Model
	FirstName string
	LastName  string
	Phone     string
	Email     string
	Password  string

	DormitoryID *uint
	Dormitory   Dormitory `gorm:"references:id"`

	Newses         []News          `gorm:"foreignKey:AdminID"`
	Documents      []Document      `gorm:"foreignKey:AdminID"`
	AdminResponses []AdminResponse `gorm:"foreignKey:AdminID"`
	Costs          []Cost          `gorm:"foreignKey:AdminID"`
	Form           []Form          `gorm:"foreignKey:AdminID"`
}
