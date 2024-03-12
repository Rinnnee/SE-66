import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingIcon from '@mui/icons-material/Settings';
import DoneIcon from '@mui/icons-material/Done';
import ResultIcon from '@mui/icons-material/Pages';
import styles from './styles.module.scss';
import { getAllForm, getFormStatus1, getFormStatus2, getFormStatus3, getFormType } from '../../../sevices/http/indexform';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';

function Form() {

    //Get Form Type
    const [formtype, setFormType] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFormType();
                setFormType(data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log("FormType = ")
    console.log(formtype)

    // Create Form
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const showAlert = () => {
        setIsAlertOpen(true);
    };

    useEffect(() => {
        if (isAlertOpen) {
            const sweetAlertNode = document.createElement('div');
            ReactDOM.render(
                <div>
                    <div className={styles.createBox}>
                        <div className={styles.titleCreate}>หัวข้อ :</div>
                        <input className={styles.inputCreate} type="text" />
                    </div>
                    <div className={styles.createBox}>
                        <div className={styles.titleCreate}>ประเภท :</div>
                        <select className={styles.inputCreate}>
                            {formtype.map((item, index) => (
                                <option key={index} value={item}>{item.FormType}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.createBox}>
                        <div className={styles.titleCreate}>รายละเอียด :</div>
                        <input className={styles.inputCreate} type="text" />
                    </div>
                </div>,
                sweetAlertNode);

            Swal.fire({
                title: 'สร้างแบบประเมิน',
                html: sweetAlertNode,
                cancelButtonText: "ยกเลิก",
                showCancelButton: true,
                // showConfirmButton: false,
                confirmButtonText: "สร้าง",
                showLoaderOnConfirm: true,
            }).then(() => {
                setIsAlertOpen(false); // Close the modal
            });
        }
    }, [isAlertOpen]);


    //Get All Form
    const [forms, setForms] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllForm();
                setForms(data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Get Form Status 1
    const [formStatus1, setFormStatus1] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFormStatus1();
                setFormStatus1(data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    // Get Form Status 2
    const [formStatus2, setFormStatus2] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFormStatus2();
                setFormStatus2(data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    // Get Form Status 3
    const [formStatus3, setFormStatus3] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFormStatus3();
                setFormStatus3(data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(forms)

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">

                {/* Main Title */}
                <Box
                    sx={{
                        bgcolor: '#FFB74D',
                        borderRadius: 2,
                        border: '1px solid #ccc',
                        padding: '10px 30px',
                        marginTop: 5,
                        alignItems: 'center',
                    }}
                >
                    <div className={styles.titleBox}>
                        <div>
                            <h1 className={styles.title}>จัดการแบบประเมินหอพัก</h1>
                        </div>
                        <div>
                            <Button
                                style={{
                                    borderRadius: 10,
                                    backgroundColor: "#28A745",
                                    fontSize: "18px",
                                    padding: "10px 20px"
                                }}
                                variant="contained" endIcon={<AddIcon />}
                                onClick={showAlert}
                            >
                                สร้างแบบประเมิน
                            </Button>
                        </div>
                    </div>
                </Box>

                {/* ฉบับร่าง */}
                <Box
                    sx={{
                        bgcolor: '#E6E6E6',
                        borderRadius: 2,
                        border: '1px solid #ccc',
                        padding: 3,
                        marginTop: 2,
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <div className={styles.head}>* ฉบับร่าง *</div>
                        {formStatus1.map((form) => (
                            <div key={form.ID}>
                                <Box
                                    sx={{
                                        bgcolor: '#FFFFFF',
                                        borderRadius: 0,
                                        border: '1px solid #ccc',
                                        padding: 2,
                                        marginTop: 0,
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    {/* แบ่งซ้ายขวา */}
                                    <div className={styles.formBox}>
                                        {/* ฝั่งซ้าย */}
                                        <div className={styles.leftBox}>
                                            {/* ซ้าย */}
                                            <div className={styles.inLeftBox1}>
                                                <div style={{ fontWeight: "bold" }}>หัวข้อ |</div>
                                                <div>ประเภท |</div>
                                                <div>รายละเอียด |</div>
                                            </div>
                                            {/* ขวา */}
                                            <div className={styles.inLeftBox2}>
                                                <div style={{ fontWeight: "bold" }}>&nbsp;{form.Name}</div>
                                                <div>&nbsp;{form.FormType.FormType}</div>
                                                <div>&nbsp;{form.Description}</div>
                                            </div>
                                        </div>
                                        <div className={styles.rightBox}>
                                            <Button
                                                style={{
                                                    // borderRadius: 50,
                                                    backgroundColor: "#6C757D",
                                                    fontSize: "16px",
                                                    padding: "5px 15px",
                                                    margin: "0px 5px",
                                                }}
                                                variant="contained" endIcon={<SettingIcon />}>
                                                แก้ไข
                                            </Button>
                                            <Button
                                                style={{
                                                    // borderRadius: 50,
                                                    backgroundColor: "#DC3545",
                                                    fontSize: "16px",
                                                    padding: "5px 15px",
                                                    margin: "0px 5px",
                                                }}
                                                variant="contained" endIcon={<DeleteIcon />}>
                                                ลบ
                                            </Button>
                                        </div>
                                    </div>
                                </Box>
                            </div>
                        ))}
                    </div>
                </Box>

                {/* เผยแพร่ */}
                <Box
                    sx={{
                        bgcolor: '#E6E6E6',
                        borderRadius: 2,
                        border: '1px solid #ccc',
                        padding: 3,
                        marginTop: 2,
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <div className={styles.head}>* เผยแพร่ *</div>
                        {formStatus2.map((form) => (
                            <div key={form.ID}>
                                <Box
                                    sx={{
                                        bgcolor: '#FFFFFF',
                                        borderRadius: 0,
                                        border: '1px solid #ccc',
                                        padding: 2,
                                        marginTop: 0,
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    {/* แบ่งซ้ายขวา */}
                                    <div className={styles.formBox}>
                                        {/* ฝั่งซ้าย */}
                                        <div className={styles.leftBox}>
                                            {/* ซ้าย */}
                                            <div className={styles.inLeftBox1}>
                                                <div style={{ fontWeight: "bold" }}>หัวข้อ |</div>
                                                <div>ประเภท |</div>
                                                <div>รายละเอียด |</div>
                                            </div>
                                            {/* ขวา */}
                                            <div className={styles.inLeftBox2}>
                                                <div style={{ fontWeight: "bold" }}>&nbsp;{form.Name}</div>
                                                <div>&nbsp;{form.FormType.FormType}</div>
                                                <div>&nbsp;{form.Description}</div>
                                            </div>
                                        </div>
                                        <div className={styles.rightBox}>
                                            <Button
                                                style={{
                                                    // borderRadius: 50,
                                                    backgroundColor: "#28A745",
                                                    fontSize: "16px",
                                                    padding: "5px 15px",
                                                    margin: "0px 5px",
                                                }}
                                                variant="contained" endIcon={<DoneIcon />}>
                                                สิ้นสุดการประเมิน
                                            </Button>
                                        </div>
                                    </div>
                                </Box>
                            </div>
                        ))}
                    </div>
                </Box>

                {/* เสร็จสิ้น */}
                <Box
                    sx={{
                        bgcolor: '#E6E6E6',
                        borderRadius: 2,
                        border: '1px solid #ccc',
                        padding: 3,
                        marginTop: 2,
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <div className={styles.head}>* เสร็จสิ้น *</div>
                        {formStatus3.map((form) => (
                            <div key={form.ID}>
                                <Box
                                    sx={{
                                        bgcolor: '#FFFFFF',
                                        borderRadius: 0,
                                        border: '1px solid #ccc',
                                        padding: 2,
                                        marginTop: 0,
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    {/* แบ่งซ้ายขวา */}
                                    <div className={styles.formBox}>
                                        {/* ฝั่งซ้าย */}
                                        <div className={styles.leftBox}>
                                            {/* ซ้าย */}
                                            <div className={styles.inLeftBox1}>
                                                <div style={{ fontWeight: "bold" }}>หัวข้อ |</div>
                                                <div>ประเภท |</div>
                                                <div>รายละเอียด |</div>
                                            </div>
                                            {/* ขวา */}
                                            <div className={styles.inLeftBox2}>
                                                <div style={{ fontWeight: "bold" }}>&nbsp;{form.Name}</div>
                                                <div>&nbsp;{form.FormType.FormType}</div>
                                                <div>&nbsp;{form.Description}</div>
                                            </div>
                                        </div>
                                        <div className={styles.rightBox}>
                                            <Button
                                                style={{
                                                    // borderRadius: 50,
                                                    backgroundColor: "#0D6EFD",
                                                    fontSize: "16px",
                                                    padding: "5px 15px",
                                                    margin: "0px 5px",
                                                }}
                                                variant="contained" endIcon={<ResultIcon />}>
                                                ผลการประเมิน
                                            </Button>
                                            <Button
                                                style={{
                                                    // borderRadius: 50,
                                                    backgroundColor: "#DC3545",
                                                    fontSize: "16px",
                                                    padding: "5px 15px",
                                                    margin: "0px 5px",
                                                }}
                                                variant="contained" endIcon={<DeleteIcon />}>
                                                ลบ
                                            </Button>
                                        </div>
                                    </div>
                                </Box>
                            </div>
                        ))}
                    </div>
                </Box>

            </Container>
        </React.Fragment>
    );
}

export default Form;
