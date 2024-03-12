package entity

import (
	

	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	
	
	RoomID      *uint
	Room        Room `gorm:"references:id"`
	DormitoryID *uint
	Dormitory   Dormitory `gorm:"references:id"`
	UserID   	*uint
	User 		User  `gorm:"references:id"`
}
