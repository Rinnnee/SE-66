package unit

import (
	// "fmt"
	"testing"
	

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestCost(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`ElectricityBill is negative`, func(t *testing.T) {
		cost := entity.Cost{
			ElectricityBill:  -3,
			WaterBill: 0,//ผิด
			TotalPrice: 4,
			
		}

		ok, err := govalidator.ValidateStruct(cost)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		
		g.Expect(err.Error()).To(Equal("ElectricityBill is negative."))

	})

	t.Run(`WaterBill is negative`, func(t *testing.T) {
		cost := entity.Cost{
			ElectricityBill: 0, 			
			WaterBill: -5, //ผิด
			TotalPrice: 0,

			
		}
	
		ok, err := govalidator.ValidateStruct(cost)
	
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	
		g.Expect(err.Error()).To(Equal("WaterBill is negative."))
	})

	t.Run(`TotalPrice is negative`, func(t *testing.T) {
		cost := entity.Cost{
			ElectricityBill: 0, 			
			WaterBill: 0, 
			TotalPrice: -5,//ผิด

			
		}
	
		ok, err := govalidator.ValidateStruct(cost)
	
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	
		g.Expect(err.Error()).To(Equal("TotalPrice is negative."))
	})


}