package entity

import "gorm.io/gorm"

type PaymentStatus struct {
	gorm.Model
	PaymentStatusName string

	Payments []Payment `gorm:"foreignKey:PaymentStatusID"`
}
