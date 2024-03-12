package entity

import (
	"gorm.io/gorm"
)

type MaintainType struct {
	gorm.Model
	MaintainTypeName string
}
