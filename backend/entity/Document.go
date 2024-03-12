package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Document struct {
	gorm.Model
	Tel                 string `valid:"matches(^[0]\\d{9}$)~PhoneNumber length is not 10 digits."`
	BankNumber          string	`valid:"stringlength(10|10)~BankNumber length is not 10 digits."`
	RoomBill            float64  `gorm:"default:0" valid:"NoNegative~RoomBill is negative.,float"`
	ElectricBill        float64  `gorm:"default:0" valid:"NoNegative~ElectricBill is negative.,float"`
	WaterBill           float64  `gorm:"default:0" valid:"NoNegative~WaterBill is negative.,float"`
	DateTimePay         time.Time  `valid:" after_yesterday~DateTimePay must be from today to future."`
	HouseNumber         string	
	VillageNumber       string	
	Lane                string
	Street              string
	SubDistrict         string  
	District            string  
	Province            string 
	PostalCode          string  `valid:"stringlength(5|5)~PostalCode length is not 5 digits.,int"`
	Description         string  `valid:"required~Description is required., stringlength(1|250)"`
	DateTimeResignation time.Time  `valid:" after_yesterday~DateTimeResignation must be from today to future."`
	DateTimeSend        time.Time  `valid:" after_yesterday~DateTimeSend must be from today to future."`//วันที่ขออนุญาตเข้า-ออก

	DocumentStatusID *uint
	DocumentStatus   DocumentStatus `gorm:"references:id"`
	DocumentTypeID   *uint
	DocumentType     DocumentType `gorm:"references:id"`
	RequestInOutID   *uint
	RequestInOut     RequestInOut `gorm:"references:id"`
	BankID           *uint
	Bank             Bank `gorm:"references:id"`
	UserID           *uint
	User             User `gorm:"references:id" valid:"-"` 
	AdminID          *uint
	Admin            Admin `gorm:"references:id"`
}

func init() {
    govalidator.CustomTypeTagMap.Set("NoNegative", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
        f := i.(float64)
        r := f >= 0 
        return r
    }))
}