package controller

import (
	"net/http"
	"github.com/asaskevich/govalidator"
	"github.com/NPimtrll/team12/entity"
	"github.com/gin-gonic/gin"
)

// POST /news
func CreateNews(c *gin.Context) {
	var news entity.News
	var category entity.Category
	var admin entity.Admin

	if err := c.ShouldBindJSON(&news); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the specified CategoryID exists
	if tx := entity.DB().Preload("Admin").Where("id = ?", news.CategoryID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Category not found"})
		return
	}

	// Check if the specified AdminID exists
	if tx := entity.DB().Where("id = ?", news.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	newsData := entity.News{
		Title:      news.Title,
		Details:    news.Details,
		DatePosted: news.DatePosted,
		Image:      news.Image,
		Link:       news.Link,
		Category:   category,
		Admin:      admin,
	}
	if _, err := govalidator.ValidateStruct(newsData) ;err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&newsData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newsData})
}

// GET /news/:id
func GetNews(c *gin.Context) {
	var news entity.News
	newsID := c.Param("id")

	if err := entity.DB().Preload("Category").Preload("Admin").First(&news, newsID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "News not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": news})
}

// DELETE /news/:id
func DeleteNews(c *gin.Context) {
	var news entity.News
	newsID := c.Param("id")

	if err := entity.DB().First(&news, newsID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "News not found"})
		return
	}

	if err := entity.DB().Delete(&news).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "News deleted successfully"})
}



// GET /news
func GetAllNews(c *gin.Context) {
    var newsList []entity.News

    // Retrieve all news articles from the database
    if err := entity.DB().Preload("Category").Preload("Admin").Find(&newsList).Error; err != nil {
        // If an error occurs, return a JSON response with an error message and a 500 status code
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve news articles"})
        return
    }

    // If news articles are found, return a JSON response with the retrieved data and a 200 status code
    c.JSON(http.StatusOK, gin.H{"data": newsList})
}

