package entity

import (
	"time"

	"gorm.io/gorm"
	"github.com/asaskevich/govalidator"
)

type Payment struct {
	gorm.Model
	PaymentDate    time.Time `valid:"required~Date is required,after_yesterday~PaymentDate must be from today to future"`
	PaymentEndDate time.Time `valid:"required~Date is required,after_yesterday~PaymentEndDate must be from today to future"`
	Slip           string  `valid:"image_valid~Slip is required"`
	
	CostID          *uint
	Cost            Cost `gorm:"references:id" valid:"-"`
	UserID          *uint
	User            User `gorm:"references:id" valid:"-"`
	RoomID  *uint
	Room    Room `gorm:"references:id" valid:"-"`
	PaymentStatusID *uint
	PaymentStatus   PaymentStatus `gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("after_yesterday", func(i interface{}, c interface{}) bool {
		return truncateToDay(i.(time.Time).Local()).After(today().AddDate(0, 0, -1))
	})

	govalidator.TagMap["image_valid"] = govalidator.Validator(func(str string) bool {
		return govalidator.Matches(str, "^(data:image(.+);base64,.+)$")
	})
}

func truncateToDay(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
}

func today() time.Time {
	return truncateToDay(time.Now())
}