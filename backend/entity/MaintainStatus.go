package entity

import (
	"gorm.io/gorm"
)

type MaintainStatus struct {
	gorm.Model
	MaintainStatusName string



}
