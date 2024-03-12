package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName string
	LastName  string
	StudentID string `valid:"required~StudentID is required, matches(^[BMD]\\d{7}$)"`
	CitizenID string `valid:"required~CitizenID is required, stringlength(13|13)"`
	Password  string
	Email     string
	Birthday  time.Time
	Year      int
	Tel       string `valid:"stringlength(10|10)"`
	Disease   string
	Allergy   string
	Photo     string `gorm:"type:longtext"`

	Documents []Document `gorm:"foreignKey:UserID"`
	Bookings  []Booking  `gorm:"foreignKey:UserID"`
	Payments  []Payment  `gorm:"foreignKey:UserID"`

	BloodTypeID *uint
	BloodType   BloodType `gorm:"references:id"`
	MajorID     *uint
	Major       Major `gorm:"references:id"`
	AddressID   *uint
	Address     Address `gorm:"references:id"`
	RoomID      *uint
	Room        *Room `gorm:"references:id"`
}

//แก้ไข type ให้ครบสาม
