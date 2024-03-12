package entity

import (
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Cost struct {
    gorm.Model
    ElectricityBill float64  `gorm:"default:0" valid:"NoNegative~ElectricityBill is negative.,float"`
    WaterBill       float64  `gorm:"default:0" valid:"NoNegative~WaterBill is negative.,float"`
    TotalPrice      float64  `gorm:"default:0" valid:"NoNegative~TotalPrice is negative.,float"`

    RoomID  *uint
    Room    Room `gorm:"references:id" valid:"-"`
    AdminID *uint
    Admin   Admin `gorm:"references:id" valid:"-"`

    Payments []Payment `gorm:"foreignKey:CostID"`
}

// func init() {
//     govalidator.CustomTypeTagMap.Set("NoNegative", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
//         f := i.(float64)
//         r := f >= 0 
//         return r
//     }))
// }

// กำหนดกฎการตรวจสอบที่กำหนดเองสำหรับแท็ก "NoNegative"
func init() {
govalidator.TagMap["NoNegative"] = govalidator.Validator(func(str string) bool {
    // ประมวลผลการตรวจสอบที่คุณต้องการ
    // ในที่นี้คุณควรตรวจสอบว่าค่าที่มากับ str ไม่เป็นค่าลบ
    // และคืนค่าเป็น true หรือ false ตามเงื่อนไขของคุณ
    return true // หรือ false ขึ้นอยู่กับเงื่อนไขของคุณ
})

}