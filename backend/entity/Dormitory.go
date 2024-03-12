package entity

import (
	"gorm.io/gorm"
)

type Dormitory struct {
	gorm.Model
	DormitoryName    string
	

	Admins   []Admin   `gorm:"foreignKey:DormitoryID"`
	Rooms    []Room    `gorm:"foreignKey:DormitoryID"`
	Bookings []Booking `gorm:"foreignKey:DormitoryID"`
}
