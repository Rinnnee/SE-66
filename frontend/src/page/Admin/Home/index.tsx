import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NewsInterface } from '../../../interfaces/INews';
import { getAllNews, deleteNews} from '../../../sevices/http/indexnews';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CategoryInterface } from '../../../interfaces/ICategory';


import Swal from 'sweetalert2';
import Pagination from '@mui/material/Pagination';


function Copyright() {

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export interface Category {
  ID: number;
  CategoryName: string;
}


function NewsPage() {



  const defaultTheme = createTheme();
  const [newsArticles, setNewsArticles] = useState<NewsInterface[]>([]);
  const [selectedNewsType, setSelectedNewsType] = useState<CategoryInterface | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      const data = await getAllNews();

      if (data) {
        const updatedNewsArticles: NewsInterface[] = data.map((article: NewsInterface) => ({
          id: article.ID,
          title: article.Title,
          image: article.Image,
          content: article.Details,
          date: new Date(article.DatePosted),
          link: article.Link,
          type: article.Category ? { ID: article.Category.ID, CategoryName: article.Category.CategoryName } : undefined,
        }));

        setNewsArticles(data);

      } else {
        console.error('Failed to fetch news data.');
      }
    };

    fetchNewsData();
  }, []);

  const handleNewsTypeClick = (newsType: string | Category) => {
    if (typeof newsType === 'string') {
      setSelectedNewsType(null);
    } else {
      setSelectedNewsType(newsType);
    }
  };



  const filteredNewsArticles = selectedNewsType
    ? newsArticles.filter((article) =>
      article.Category ? article.CategoryID === selectedNewsType.ID : false
    )
    : newsArticles;


  const categories: Category[] = [

    { ID: 1, CategoryName: 'ข่าวทางเศรษฐกิจ' },
    { ID: 2, CategoryName: 'ข่าวทางการศึกษา' },
    { ID: 3, CategoryName: 'ข่าวสิ่งแวดล้อม' },
    { ID: 4, CategoryName: 'ข่าวบันเทิง' },
    { ID: 5, CategoryName: 'ข่าวทางกีฬา' },
    { ID: 6, CategoryName: 'ข่าวทางวิทยาศาสตร์และเทคโนโลยี' },

    // Add more categories as needed
  ];

  // ประกาศ state สำหรับการจัดการหน้าที่กำลังแสดง
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6; // จำนวนข่าวที่ต้องการแสดงในแต่ละหน้า

  // คำนวณข่าวที่ต้องแสดงในหน้าปัจจุบัน
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNewsArticles.slice(indexOfFirstNews, indexOfLastNews);

  // ฟังก์ชั่นที่เรียกเมื่อเปลี่ยนหน้า
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleDelete = async (id: number | undefined) => {
    // Show a confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    // If the user clicks "Yes", proceed with the deletion
    if (result.isConfirmed) {
      const deletionResult = await deleteNews(id);
      console.log('Deletion result:', deletionResult);
      if (deletionResult.status) {
        // Remove the deleted news from the state
        setNewsArticles((prevNews) => prevNews.filter((article) => article.ID !== id));

        // Show success message
        Swal.fire('Deleted!', 'News has been deleted.', 'success');
        console.log('News deleted successfully:', deletionResult);

      }
      Swal.fire('Deleted!', 'News has been deleted.', 'success');
      setTimeout(function () {
        window.location.reload();
      }, 1000);




      /* else {
          // Show error message if deletion fails
          Swal.fire('Error!', 'Failed to delete news.', 'error');
          console.error('Failed to delete news.');
        } */
    }
  };


  const handleShowAllCategories = () => {
    setSelectedNewsType(null);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            จัดการข่าวประชาสัมพันธ์
          </Typography>

        </Container>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 2,
            pb: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button variant={selectedNewsType ? 'outlined' : 'contained'}
            color="primary" onClick={handleShowAllCategories}>
            หน้าแรก
          </Button>
          {categories.map((category) => (
            <Button
              key={category.ID}
              onClick={() => handleNewsTypeClick(category)}
              variant={
                selectedNewsType && selectedNewsType.ID === category.ID
                  ? 'contained'
                  : 'outlined'
              }
            >
              {category.CategoryName}
            </Button>
          ))}
        </Box >

        <Container sx={{
          py: 8,
          border: '1px solid #ccc',
          boxShadow: 5,
        }} maxWidth="lg">

          <Grid container spacing={2} sx={{ flexWrap: 'wrap' }}>
            {currentNews.map((article) => (
              <Grid item key={article.ID} xs={12} sm={6} md={4}>

                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image={article.Image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" className="blueText">
                      {article.Title}
                    </Typography>

                    {article.Details && (
                      <Typography>
                        {article.Details.length > 150 ? article.Details.substring(0, 150) + '...' : article.Details}
                      </Typography>
                    )}

                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {article.DatePosted ? format(new Date(article.DatePosted), 'MMMM dd, yyyy') : 'Date Not Available'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={article.Link} target="_blank" rel="noopener noreferrer">
                      Read More
                    </Button>
                    <Button size="small" onClick={() => handleDelete(article.ID)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} sx={{
            justifyContent: 'center',
            mt: 2,
            position: 'absolute',
            //bottom: '20px', // ปรับตำแหน่งตามความต้องการ
            left: '50%', // จัดให้อยู่ตรงกลางตามแนวนอน
            //transform: 'translateX(-50%)', // จัดให้อยู่ตรงกลางตามแนวนอน
          }}>
            <Pagination
              count={Math.ceil(filteredNewsArticles.length / newsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          มหาวิทยาลัยเทคโนโลยีสุรนารี
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          ส่วนกิจการหอพักนักศึกษา | SUT |
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}

export default NewsPage;

