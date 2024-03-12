package entity

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("Database.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(
		&Major{},
		&Address{},
		&Category{},
		&RoomStatus{},
		&RoomType{},
		&PaymentStatus{},
		&DocumentType{},
		&DocumentStatus{},
		&RequestInOut{},
		&Bank{},
		&Dormitory{},
		&Admin{},
		&News{},
		&Room{},
		&Cost{},
		&User{},
		&Payment{},
		&Booking{},
		&Document{},
		&AdminResponse{},
		&ContactLog{},
		&Maintain{},
		&MaintainStatus{},
		&MaintainType{},
		&Form{},
		&FormChoice{},
		&FormStatus{},
		&FormTopic{},
		&FormTopicType{},
		&FormType{},
	)
	db = database
	initData(db)

	// Roomtatus Data
	database.Where(RoomStatus{RoomStatusName: "เปิดจองปกติ"}).FirstOrCreate(&RoomStatus{RoomStatusName: "เปิดจองปกติ"})
	database.Where(RoomStatus{RoomStatusName: "ปิดปรับปรุง"}).FirstOrCreate(&RoomStatus{RoomStatusName: "ปิดปรับปรุง"})

	// RoomType Data
	database.Where(RoomType{RoomTypeName: "ห้องพัดลม"}).FirstOrCreate(&RoomType{RoomTypeName: "ห้องพัดลม"})
	database.Where(RoomType{RoomTypeName: "ห้องเเอร์"}).FirstOrCreate(&RoomType{RoomTypeName: "ห้องเเอร์"})

	// Dormitory Data
	database.Where(Dormitory{DormitoryName: "หอสุรนิเวศ 1"}).FirstOrCreate(&Dormitory{DormitoryName: "หอสุรนิเวศ 1"})
	database.Where(Dormitory{DormitoryName: "หอสุรนิเวศ 2"}).FirstOrCreate(&Dormitory{DormitoryName: "หอสุรนิเวศ 2"})
	database.Where(Dormitory{DormitoryName: "หอสุรนิเวศ 3"}).FirstOrCreate(&Dormitory{DormitoryName: "หอสุรนิเวศ 3"})

	//Payment
	database.Where(PaymentStatus{PaymentStatusName: "จ่ายเเล้ว"}).FirstOrCreate(&PaymentStatus{PaymentStatusName: "จ่ายเเล้ว"})
	database.Where(PaymentStatus{PaymentStatusName: "ยังไม่จ่าย"}).FirstOrCreate(&PaymentStatus{PaymentStatusName: "ยังไม่จ่าย"})

	// Document
	database.Where(DocumentType{DocumentTypeName: "ฟอร์มผ่อนผัน"}).FirstOrCreate(&DocumentType{DocumentTypeName: "ฟอร์มผ่อนผัน"})
	database.Where(DocumentType{DocumentTypeName: "ฟอร์มลาออกจากหอพัก"}).FirstOrCreate(&DocumentType{DocumentTypeName: "ฟอร์มลาออกจากหอพัก"})
	database.Where(DocumentType{DocumentTypeName: "ฟอร์มขอเงินประกันหอพัก"}).FirstOrCreate(&DocumentType{DocumentTypeName: "ฟอร์มขอเงินประกันหอพัก"})
	database.Where(DocumentType{DocumentTypeName: "ฟอร์มขออนุญาต เข้า-ออกหอพัก"}).FirstOrCreate(&DocumentType{DocumentTypeName: "ฟอร์มขออนุญาต เข้า-ออกหอพัก"})

	database.Where(DocumentStatus{DocumentStatusName: "รอการอนุมัติ"}).FirstOrCreate(&DocumentStatus{DocumentStatusName: "รอการอนุมัติ"})
	database.Where(DocumentStatus{DocumentStatusName: "อนุมัติ"}).FirstOrCreate(&DocumentStatus{DocumentStatusName: "อนุมัติ"})
	database.Where(DocumentStatus{DocumentStatusName: "ไม่อนุมัติ"}).FirstOrCreate(&DocumentStatus{DocumentStatusName: "ไม่อนุมัติ"})

	database.Where(Bank{BankName: "ธนาคารกรุงไทย"}).FirstOrCreate(&Bank{BankName: "ธนาคารกรุงไทย"})
	database.Where(Bank{BankName: "ธนาคารออมสิน"}).FirstOrCreate(&Bank{BankName: "ธนาคารออมสิน"})
	database.Where(Bank{BankName: "ธนาคารกรุงเทพ"}).FirstOrCreate(&Bank{BankName: "ธนาคารกรุงเทพ"})
	database.Where(Bank{BankName: "ธนาคารไทยพาณิชย์"}).FirstOrCreate(&Bank{BankName: "ธนาคารไทยพาณิชย์"})
	database.Where(Bank{BankName: "รับคืนเป็นเงินสด"}).FirstOrCreate(&Bank{BankName: "รับคืนเป็นเงินสด"})

	database.Where(RequestInOut{RequestInOutName: "ขอกลับหอพักหลังเวลาปิดหอพัก"}).FirstOrCreate(&RequestInOut{RequestInOutName: "ขอกลับหอพักหลังเวลาปิดหอพัก"})
	database.Where(RequestInOut{RequestInOutName: "ขอออกจากหอพักก่อนเวลาเปิดหอพัก"}).FirstOrCreate(&RequestInOut{RequestInOutName: "ขอออกจากหอพักก่อนเวลาเปิดหอพัก"})
	database.Where(RequestInOut{RequestInOutName: "ค้างคืนนอกหอพัก"}).FirstOrCreate(&RequestInOut{RequestInOutName: "ค้างคืนนอกหอพัก"})
	
	//admin
	adminPassword := "1234"
    hashedPassword,_ := bcrypt.GenerateFromPassword([]byte(adminPassword), 14)
	admins := []Admin{
		{FirstName: "ธนาภรณ์", LastName: "หิริโกกุล", Email: "admin@gmail.com", Password: string(hashedPassword)},
	}

	for _, admin := range admins {
		database.Where(User{FirstName: admin.FirstName}).FirstOrCreate(&admin)
	}

	// //bloodType 
	// database.Where(BloodType{BloodTypeName: "A"}).FirstOrCreate(&BloodType{BloodTypeName: "A"})
	// database.Where(BloodType{BloodTypeName: "B"}).FirstOrCreate(&BloodType{BloodTypeName: "B"})
	// database.Where(BloodType{BloodTypeName: "AB"}).FirstOrCreate(&BloodType{BloodTypeName: "AB"})
	// database.Where(BloodType{BloodTypeName: "O"}).FirstOrCreate(&BloodType{BloodTypeName: "O"})

	// //major
	// database.Where(Major{MajorName: "สำนักวิชาวิทยาศาสตร์"}).FirstOrCreate(&Major{MajorName: "สำนักวิชาวิทยาศาสตร์"})
	// database.Where(Major{MajorName: "สำนักวิชาเทคโนโลยีสังคม"}).FirstOrCreate(&Major{MajorName: "สำนักวิชาเทคโนโลยีสังคม"})
	// database.Where(Major{MajorName: "สำนักวิชาแพทย์ศาสตร์"}).FirstOrCreate(&Major{MajorName: "สำนักวิชาแพทย์ศาสตร์"})
	// database.Where(Major{MajorName: "สำนักวิชาวิศวกรรมศาสตร์"}).FirstOrCreate(&Major{MajorName: "สำนักวิชาวิศวกรรมศาสตร์"})
	// database.Where(Major{MajorName: "สำนักวิชาพยาบาลศาสตร์"}).FirstOrCreate(&Major{MajorName: "สำนักวิชาพยาบาลศาสตร์"})
	// database.Where(Major{MajorName: "สำนักวิชาทันตแพทยศาสตร์"}).FirstOrCreate(&Major{MajorName: "สำนักวิชาทันตแพทยศาสตร์"})
	// database.Where(Major{MajorName: "สำนักวิชาสาธารณสุขศาสตร์"}).FirstOrCreate(&Major{MajorName: "สำนักวิชาสาธารณสุขศาสตร์"})
	// database.Where(Major{MajorName: "สำนักวิชาศาสตร์และศิลปดิจิทอล"}).FirstOrCreate(&Major{MajorName: "สำนักวิชาศาสตร์และศิลปดิจิทอล"})


}

func initData(db *gorm.DB) {

	initBloodType(db)
	initMajor(db)
	initMaintainType(db)
	initMaintainStatus(db)
	initCategory(db)
	initForm(db)
}

func initBloodType(db *gorm.DB) {
	bloodTypes := []BloodType{
		{
			Model:         gorm.Model{ID: 1},
			BloodTypeName: "A",
		},
		{
			Model:         gorm.Model{ID: 2},
			BloodTypeName: "B",
		},
		{
			Model:         gorm.Model{ID: 3},
			BloodTypeName: "AB",
		},
		{
			Model:         gorm.Model{ID: 4},
			BloodTypeName: "O",
		},
	}
	for _, bloodType := range bloodTypes {
		err := db.Create(&bloodType).Error
		if err != nil {
			fmt.Println("Error: ", err.Error())
		}
	}
}

func initMajor(db *gorm.DB) {
	majors := []Major{
		{
			Model:     gorm.Model{ID: 1},
			MajorName: "สำนักวิชาวิทยาศาสตร์",
		},
		{
			Model:     gorm.Model{ID: 2},
			MajorName: "สำนักวิชาเทคโนโลยีสังคม",
		},
		{
			Model:     gorm.Model{ID: 3},
			MajorName: "สำนักวิชาแพทย์ศาสตร์",
		},
		{
			Model:     gorm.Model{ID: 4},
			MajorName: "สำนักวิชาวิศวกรรมศาสตร์",
		},
		{
			Model:     gorm.Model{ID: 5},
			MajorName: "สำนักวิชาพยาบาลศาสตร์",
		},
		{
			Model:     gorm.Model{ID: 6},
			MajorName: "สำนักวิชาทันตแพทยศาสตร",
		},
		{
			Model:     gorm.Model{ID: 7},
			MajorName: "สำนักวิชาสาธารณสุขศาสตร์",
		},
		{
			Model:     gorm.Model{ID: 8},
			MajorName: "สำนักวิชาศาสตร์และศิลปดิจิทอล",
		},
	}
	for _, major := range majors {
		err := db.Create(&major).Error
		if err != nil {
			fmt.Println("Error: ", err.Error())
		}
	}
}

func initMaintainStatus(db *gorm.DB) {
	MaintainStatus := []MaintainStatus{
		{
			Model:              gorm.Model{ID: 1},
			MaintainStatusName: "ยังไม่ดําเนินการ",
		},
		{
			Model:              gorm.Model{ID: 2},
			MaintainStatusName: "อยู่ระหว่างดําเนินการ",
		},
		{
			Model:              gorm.Model{ID: 3},
			MaintainStatusName: "ดําเนินการแล้ว",
		},
	}
	for _, MaintainStatus := range MaintainStatus {
		err := db.Create(&MaintainStatus).Error
		if err != nil {
			fmt.Println("Error: ", err.Error())
		}
	}
}

func initMaintainType(db *gorm.DB) {
	maintainType := []MaintainType{
		{
			Model:            gorm.Model{ID: 1},
			MaintainTypeName: "แจ้งทำความสะอาดห้องพัก",
		},
		{
			Model:            gorm.Model{ID: 2},
			MaintainTypeName: "แจ้งซ่อมไฟฟ้าและประปา",
		},
		{
			Model:            gorm.Model{ID: 3},
			MaintainTypeName: "งานซ่อมบำรุงและรักษา",
		},
		{
			Model:            gorm.Model{ID: 4},
			MaintainTypeName: "งานยานพาหนะ",
		},
	}
	for _, maintainType := range maintainType {
		err := db.Create(&maintainType).Error
		if err != nil {
			fmt.Println("Error: ", err.Error())
		}
	}
}

func initCategory(db *gorm.DB) {
	category := []Category{
		{
			Model:        gorm.Model{ID: 1},
			CategoryName: "ข่าวทางเศรษฐกิจ",
		},
		{
			Model:        gorm.Model{ID: 2},
			CategoryName: "ข่าวทางการศึกษา",
		},
		{
			Model:        gorm.Model{ID: 3},
			CategoryName: "ข่าวสิ่งแวดล้อม",
		},
		{
			Model:        gorm.Model{ID: 4},
			CategoryName: "ข่าวบันเทิง",
		},
		{
			Model:        gorm.Model{ID: 5},
			CategoryName: "ข่าวทางกีฬา",
		},
		{
			Model:        gorm.Model{ID: 6},
			CategoryName: "ข่าวทางวิทยาศาสตร์และเทคโนโลยี ",
		},
	}
	for _, category := range category {
		err := db.Create(&category).Error
		if err != nil {
			fmt.Println("Error: ", err.Error())
		}
	}
}

func initForm(db *gorm.DB) {

	// Form Status
	formStatuses := []FormStatus{
		{
			Model:      gorm.Model{ID: 1},
			FormStatus: "ฉบับร่าง",
		},
		{
			Model:      gorm.Model{ID: 2},
			FormStatus: "กำลังประเมิน",
		},
		{
			Model:      gorm.Model{ID: 3},
			FormStatus: "สิ้นสุดการประเมิน",
		},
	}
	for _, formStatuses := range formStatuses {
		err := db.Create(&formStatuses).Error
		if err != nil {
			fmt.Println("Error: ", err.Error())
		}
	}

	// Form Topic Type
	formtopictypes := []FormTopicType{
		{
			Model:         gorm.Model{ID: 1},
			FormTopicType: "เลือกตอบ",
		},
		{
			Model:         gorm.Model{ID: 2},
			FormTopicType: "เขียนตอบ",
		},
	}
	for _, formtopictypes := range formtopictypes {
		err := db.Create(&formtopictypes).Error
		if err != nil {
			fmt.Println("Error: ", err.Error())
		}
	}

	// Form Type
	formTypes := []FormType{
		{
			Model:    gorm.Model{ID: 1},
			FormType: "ประเมินภาพรวม",
		},
		{
			Model:    gorm.Model{ID: 2},
			FormType: "ประเมินระบบจัดการหอพัก",
		},
		{
			Model:    gorm.Model{ID: 3},
			FormType: "ประเมินคุณภาพหอพัก",
		},
		{
			Model:    gorm.Model{ID: 4},
			FormType: "ประเมินแม่บ้าน",
		},
		{
			Model:    gorm.Model{ID: 5},
			FormType: "ประเมินกรรมการหอ",
		},
	}
	for _, formTypes := range formTypes {
		err := db.Create(&formTypes).Error
		if err != nil {
			fmt.Println("Error: ", err.Error())
		}
	}

}
