package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model

	RoomName string `valid:"stringlength(5|14)~Room is stringlength(5|14)"`
	Capacity int `valid:"required~Capacity:is non-zero"`
	Price    float64 `valid:"range(1|1000000)~ราคาไม่ติดลบ"`

	Occupancy int

	RoomTypeID   *uint
	RoomType     RoomType `gorm:"references:id"`
	RoomStatusID *uint
	RoomStatus   RoomStatus `gorm:"references:id"`
	DormitoryID  *uint
	Dormitory    Dormitory `gorm:"references:id"`

	Users    []User    `gorm:"foreignKey:RoomID"`
	Bookings []Booking `gorm:"foreignKey:RoomID"`
	Costs    []Cost    `gorm:"foreignKey:RoomID"`
}
