package entity

import "gorm.io/gorm"

type Address struct {
	gorm.Model
	PostalCode  string
	Street      string
	District    string
	StudentID   string
	SubDistrict string
	Province    string
	HouseNumber string

	Users []User `gorm:"foreignKey:AddressID"`
}
