package main

import (
	"github.com/NPimtrll/team12/controller"
	admin_controller "github.com/NPimtrll/team12/controller/admin"
	login_controller "github.com/NPimtrll/team12/controller/login"
	"github.com/NPimtrll/team12/entity"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	initRouter(r)

	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func initRouter(r *gin.Engine) {
	//user
	r.GET("/user/:studentID", controller.GetUserByStudentID)
	r.POST("/user/:studentID/address", controller.CreateAddress)
	r.PUT("/user/:studentID", controller.UpdateUser)
	r.PUT("/user/:studentID/address", controller.UpdateAddress)
	r.GET("/users", controller.GetAllUser)
	r.DELETE("/user/:studentID", controller.DeleteUser)
	r.POST("/user", controller.CreateUser)
	r.GET("/bloodtypes", controller.GetAllBloodType)
	r.GET("/majors", controller.GetAllMajor)
	// room
	r.POST("/rooms", controller.CreateRoom)
	r.GET("/rooms", controller.ListRooms)
	r.DELETE("/rooms/:id", controller.DeleteRoom)
	r.GET("/rooms/:id", controller.GetRoom)
	r.PATCH("/rooms", controller.UpdateRoom)
	// room status
	r.GET("/roomstatus", controller.Listroomstatus)
	//room type
	r.GET("/roomtype", controller.Listroomtypes)
	// room dormitorys
	r.GET("/roomdormitorys", controller.Listdormitorys)
	r.GET("/roomdormitorys/:id", controller.GetDormitoryRooms)
	// Booking
	r.POST("/bookingroom", controller.BookingRoom)
	r.DELETE("/bookingroom/:id", controller.DeleteBookingRoom)
	r.GET("/bookingroom/:id", controller.GetUserBookings)
	// login User Route
	r.POST("/login/user", login_controller.LoginUser)

	// login Admin Route
	r.POST("/login/admin", login_controller.LoginAdmin)
	r.POST("/admin", admin_controller.CreateAdmin)
	r.GET("/admins", admin_controller.GetAllAdmin)

	// Contact Log Routes
	r.POST("/contact-log/:studentID", controller.CreateContactLog)
	r.DELETE("/contact-log/:contactLogID", controller.DeleteContactLog)
	r.GET("/contact-log/:id", controller.GetContactLogsByUserID)

	// Admin Response Route
	r.GET("/contact-logs", controller.ViewAllContactLogs)
	r.POST("/:adminID/:contactLogID/response", controller.CreateAdminResponse)

	//cost
	r.POST("/costs", controller.CreateCost)
	r.GET("/costs", controller.ListCosts)
	r.DELETE("/costs/:id", controller.DeleteCost)
	r.GET("/costs/:id", controller.GetCost)
	r.PATCH("/costs", controller.UpdateCosts)

	//payment
	r.POST("/payments", controller.CreatePayments)
	r.GET("/payments", controller.ListPayments)
	r.DELETE("/payments/:id", controller.DeletePayment)
	r.GET("/payments/cost/:id", controller.GetPayment)
	r.PATCH("/payments", controller.UpdatePayments)
	r.GET("/payments/:UserID", controller.GetPaymentByUserID)
	r.PATCH("/payments/slip", controller.UpdateSlip)

	//paymentstatus
	r.GET("/paymentstatus", controller.Listpaymentstatus)

	// maintain
	r.POST("/maintain", controller.CreateMaintain)
	r.GET("/maintains", controller.GetAllMaintain)
	r.GET("/maintain/:id", controller.GetMaintain)
	r.DELETE("/maintain/:id", controller.DeleteMaintain)
	r.PATCH("/maintain", controller.UpdateMaintain)

	// maintain status
	r.GET("/maintain-status", controller.GetMaintainStatusList)
	r.GET("/maintain-status/:id", controller.GetMaintainStatusByID)

	// maintain type
	r.GET("/maintain-type", controller.GetMaintainTypeList)
	r.GET("/maintain-type/:id", controller.GetMaintainTypeByID)

	// news
	r.POST("/news", controller.CreateNews)
	r.GET("/news/:id", controller.GetNews)
	r.GET("/news", controller.GetAllNews)
	r.DELETE("/news/:id", controller.DeleteNews)

	// category
	r.GET("/category/:id", controller.GetCategory)
	r.GET("/categories", controller.GetAllCategories)

	//document
	r.POST("/resignform", controller.CreateResignForm)
	r.POST("/payform", controller.CreatePayForm)
	r.POST("/depositform", controller.CreateDepositForm)
	r.POST("/inoutform", controller.CreateInOutForm)

	r.GET("/documents", controller.GetAllDocument)
	r.GET("/documenttypes", controller.GetAllDocumentType)
	r.GET("/documentstatuses", controller.GetAllDocumentStatus)
	r.GET("/documentBanks", controller.GetAllDocumentBank)
	r.GET("/requestInOuts", controller.GetAllRequestInOut)

	r.GET("/resignform/byUser/:id", controller.GetResignFormByUserID)
	r.GET("/depositform/byUser/:id", controller.GetDepositFormByUserID)
	r.GET("/payform/byUser/:id", controller.GetPayFormByUserID)
	r.GET("/inoutform/byUser/:id", controller.GetInOutFormByUserID)

	r.GET("/resignforms", controller.GetAllResignForm)
	r.GET("/payforms", controller.GetAllPayForm)
	r.GET("/depositforms", controller.GetAllDepositForm)
	r.GET("/inoutforms", controller.GetAllInOutForm)

	r.DELETE("/document/:id", controller.DeleteDocument)
	r.PATCH("/document", controller.UpdateDocument)
	r.PATCH("/documentstatus", controller.UpdateDocumentStatus)

	r.GET("/payform/:id", controller.GetPayFormByID)
	r.GET("/resignform/:id", controller.GetResignFormByID)
	r.GET("/depositform/:id", controller.GetDepositFormByID)
	r.GET("/inoutform/:id", controller.GetInOutFormByID)
	r.GET("/document/:id", controller.GetDocumentByID)

	//Form
	r.GET("/formstatus", controller.GetFormStatus)
	r.GET("/formtype", controller.GetFormType)
	r.GET("/forms", controller.GetAllForm)
	r.GET("/form/:id", controller.GetFormByID)
	r.GET("/formstatus1", controller.GetFormStatus1)
	r.GET("/formstatus2", controller.GetFormStatus2)
	r.GET("/formstatus3", controller.GetFormStatus3)
	r.POST("/addform", controller.PostForm)
	r.PUT("/updateformstatus/:id", controller.UpdateFormStatus)
	r.DELETE("/deleteform/:id", controller.DeleteForm)

	r.GET("/formtopictype", controller.GetFormTopicType)
	r.GET("/formtopics", controller.GetAllFormTopic)
	r.POST("/addformtopic", controller.PostFormTopic)
	r.DELETE("/deleteformtopic/:id", controller.DeleteFormTopic)

	r.GET("/formchoices", controller.GetAllFormChoice)
	r.POST("/addformchoice", controller.PostFormChoice)
	r.DELETE("/deleteformchoice/:id", controller.DeleteFormchoice)

}
