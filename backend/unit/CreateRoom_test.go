package unit

import (
	_ "fmt"
	"testing"
	

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestRoom(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`stringlength(5|15)`, func(t *testing.T) {
		RoomTypeID := uint(1)
		RoomStatusID := uint(1)
		DormitoryID :=uint(1)

		room := entity.Room{
			RoomName:   "B1", // ผิดตรงนี้
			Capacity:   2,
			Price: 1,
			Occupancy:0,
			RoomTypeID: &RoomTypeID,
			RoomStatusID: &RoomStatusID,
			DormitoryID: &DormitoryID,
			
		}

		ok, err := govalidator.ValidateStruct(room)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Room is stringlength(5|14)"))
	})

	t.Run(`Capacity:is non-zero`, func(t *testing.T) {
		RoomTypeID := uint(1)
		RoomStatusID := uint(1)
		DormitoryID :=uint(1)

		room := entity.Room{
			RoomName:   "B12345", 
			Capacity:   0, // ผิดตรงนี้
			Price: 1,
			Occupancy:0,
			RoomTypeID: &RoomTypeID,
			RoomStatusID: &RoomStatusID,
			DormitoryID: &DormitoryID,
			
		}

		ok, err := govalidator.ValidateStruct(room)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Capacity:is non-zero"))
	})

	t.Run(`ราคาไม่ติดลบ`, func(t *testing.T) {
		RoomTypeID := uint(1)
		RoomStatusID := uint(1)
		DormitoryID :=uint(1)

		room := entity.Room{
			RoomName:   "B12345", 
			Capacity:   3, 
			Price: -100,// ผิดตรงนี้
			Occupancy:0,
			RoomTypeID: &RoomTypeID,
			RoomStatusID: &RoomStatusID,
			DormitoryID: &DormitoryID,
			
		}

		ok, err := govalidator.ValidateStruct(room)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("ราคาไม่ติดลบ"))
	})

	
}

func TestRoomTrue(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`stringlength(5|15)`, func(t *testing.T) {
		RoomTypeID := uint(1)
		RoomStatusID := uint(1)
		DormitoryID :=uint(1)

		room := entity.Room{
			RoomName:   "B12345", 
			Capacity:   3,
			Price: 1,
			Occupancy:0,
			RoomTypeID: &RoomTypeID,
			RoomStatusID: &RoomStatusID,
			DormitoryID: &DormitoryID,
			
		}

		ok, err := govalidator.ValidateStruct(room)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

		
	})

	
}

