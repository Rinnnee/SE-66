package unit

import (

	"testing"
	"time"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDocument(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Document vaild`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "0910566421",
			BankNumber:          "9869555586",
			RoomBill:            0,
			ElectricBill:        0,
			WaterBill:           0,
			DateTimePay:        time.Now(),
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "48000",
			Description:         "สวัสดีค่ะ",
			DateTimeResignation: time.Now(),
			DateTimeSend:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})

	t.Run(`phone number check 10 digit`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "11234567891",//ผิด
			BankNumber:          "9869555586",
			RoomBill:            0,
			ElectricBill:        0,
			WaterBill:           0,
			DateTimePay:        time.Now(),
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "48000",
			Description:         "สวัสดีค่ะ",
			DateTimeResignation: time.Now(),
			DateTimeSend:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("PhoneNumber length is not 10 digits."))

	})

	t.Run(`BankNumber length is not 10 digits`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "0910566421",
			BankNumber:          "986955",//ผิด
			RoomBill:            0,
			ElectricBill:        0,
			WaterBill:           0,
			DateTimePay:        time.Now(),
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "12345",
			Description:         "สวัสดีค่ะ",
			DateTimeResignation: time.Now(),
			DateTimeSend:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("BankNumber length is not 10 digits."))

	})

	t.Run(`DateTimePay must be from today to future`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "0910566421",
			BankNumber:          "9869555586",
			RoomBill:            0,
			ElectricBill:        0,
			WaterBill:           0,
			DateTimePay:        time.Now().AddDate(-1, 0, -1),//ผิด
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "12345",
			Description:         "สวัสดีค่ะ",
			DateTimeResignation: time.Now(),
			DateTimeSend:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("DateTimePay must be from today to future."))

	})

	t.Run(`DateTimeResignation must be from today to future`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "0910566421",
			BankNumber:          "9869555586",
			RoomBill:            0,
			ElectricBill:        0,
			WaterBill:           0,
			DateTimePay:        time.Now(),
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "12345",
			Description:         "สวัสดีค่ะ",
			DateTimeResignation: time.Now().AddDate(-1, 0, -1),//ผิด
			DateTimeSend:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("DateTimeResignation must be from today to future."))

	})

	t.Run(`DateTimeSend must be from today to future`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "0910566421",
			BankNumber:          "9869555586",
			RoomBill:            0,
			ElectricBill:        0,
			WaterBill:           0,
			DateTimePay:        time.Now(),
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "12345",
			Description:         "สวัสดีค่ะ",
			DateTimeResignation: time.Now(),
			DateTimeSend:        time.Now().AddDate(-1, 0, -1),//ผิด
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("DateTimeSend must be from today to future."))

	})

	t.Run(`Description is required`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "0910566421",
			BankNumber:          "9869555586",
			RoomBill:            0,
			ElectricBill:        0,
			WaterBill:           0,
			DateTimePay:        time.Now(),
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "48000",
			Description:         "",//ผิด
			DateTimeResignation: time.Now(),
			DateTimeSend:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Description is required."))

	})

	t.Run(`PostalCode check 5 digit`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "0910566421",
			BankNumber:          "9869555586",
			RoomBill:            0,
			ElectricBill:        0,
			WaterBill:           0,
			DateTimePay:        time.Now(),
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "123456",//ผิด
			Description:         "สวัสดีค่ะ",
			DateTimeResignation: time.Now(),
			DateTimeSend:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("PostalCode length is not 5 digits."))

	})

	t.Run(`RoomBill is negative`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "0910566421",
			BankNumber:          "9869555586",
			RoomBill:            -2,//ผิด
			ElectricBill:        0,
			WaterBill:           0,
			DateTimePay:        time.Now(),
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "12345",
			Description:         "สวัสดีค่ะ",
			DateTimeResignation: time.Now(),
			DateTimeSend:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("RoomBill is negative."))

	})

	t.Run(`ElectricBill is negative`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "0910566421",
			BankNumber:          "9869555586",
			RoomBill:            0,
			ElectricBill:        -955,//ผิด
			WaterBill:           0,
			DateTimePay:        time.Now(),
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "12345",
			Description:         "สวัสดีค่ะ",
			DateTimeResignation: time.Now(),
			DateTimeSend:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("ElectricBill is negative."))

	})

	t.Run(`WaterBill is negative`, func(t *testing.T) {
		document := entity.Document{
			Tel:                 "0910566421",
			BankNumber:          "9869555586",
			RoomBill:            0,
			ElectricBill:        0,
			WaterBill:           -44,//ผิด
			DateTimePay:        time.Now(),
			HouseNumber:         "80/9",
			VillageNumber:       "50",
			Lane:                "ใหม่",
			Street:              "กลาง",
			SubDistrict:         "เมือง",
			District:            "เมือง",
			Province:            "นครพนม",
			PostalCode:          "12345",
			Description:         "สวัสดีค่ะ",
			DateTimeResignation: time.Now(),
			DateTimeSend:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(document)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("WaterBill is negative."))

	})





}

