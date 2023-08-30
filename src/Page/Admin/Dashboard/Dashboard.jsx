import React, { useState, useEffect } from 'react';
import {
  CAvatar,
  CCard,
  CCardBody,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
} from '@coreui/icons';

import ordersApi from '../../../api/orders';
import productApi from '../../../api/products';

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]


  const [totalPriceSum, setTotalPriceSum] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [quantityOut, setQuantityOut] = useState(0);
  const [priceInventory, setPriceInventory] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);


  const fetchTotal_price = async () => {
    try {
      const list = await ordersApi.GetAll(); // Assuming this returns an array of objects

      const filteredList = list.filter(order => order.status === 3);

      const sum = filteredList.reduce((acc, order) => {
        return acc + order.total_price;
      }, 0);

      setTotalPriceSum(sum);
    } catch (error) {
      console.error('Error fetching total price:', error);
    }
  };

  const fetch_quantity_out = async () => {
    try {
      const ordersData = await ordersApi.GetAll(); // Assuming this returns an array of objects with product arrays
      console.log('ordersData: ', ordersData);

      const filteredOrders = ordersData.filter(order => order.status === 3);

      const sum = filteredOrders.reduce((acc, order) => {
        const orderQuantities = order.product.map(product => product.quantity);
        const orderSum = orderQuantities.reduce((orderAcc, orderQuantity) => orderAcc + orderQuantity, 0);
        return acc + orderSum;
      }, 0);

      setQuantityOut(sum);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const total_quantity = async () => {
    try {
      const data = await productApi.GetAll(); // Assuming this returns an array of objects with product_entries
      console.log("data-entry: ", data);

      const sum = data.reduce((acc, record) => {
        const entryQuantities = record.product_entries.map(entry => entry.quantity);
        const entrySum = entryQuantities.reduce((entryAcc, entryQuantity) => entryAcc + entryQuantity, 0);
        return acc + entrySum;
      }, 0);

      setQuantity(sum);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetch_price_inventory = async () => {
    try {
      const productsData = await productApi.GetAll(); // Assuming this returns an array of objects
      console.log('productsData: ', productsData);

      const sum = productsData.reduce((acc, product) => {
        const productTotalPrice = product.product_entries.reduce((entryAcc, entry) => {
          return entryAcc + entry.quantity * product.price;
        }, 0);
        return acc + productTotalPrice;
      }, 0);

      setPriceInventory(sum);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchOrdersByMonth = async () => {
    try {
      const ordersData = await ordersApi.GetAll(); // Assuming this returns an array of objects

      const ordersByMonth = {};

      ordersData.forEach(order => {
        if (order.status === 3) {
          const createdAt = new Date(order.created_at);
          const yearMonth = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;

          if (!ordersByMonth[yearMonth]) {
            ordersByMonth[yearMonth] = 0;
          }

          ordersByMonth[yearMonth] += order.total_price;
        }
      });

      const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ];

      // Create an array of data for the chart
      const chartData = months.map(month => {
        const yearMonth = `${new Date().getFullYear()}-${months.indexOf(month) + 1}`;
        return ordersByMonth[yearMonth] || 0; // If data doesn't exist for the month, set it to 0
      });

      setMonthlyData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchTotal_price();
    total_quantity();
    fetch_quantity_out();
    fetch_price_inventory();
    fetchOrdersByMonth();
  }, []);

  const formattedTotalPrice = totalPriceSum.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  const formattedPriceInventory = priceInventory.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });




  const tableExample = [
    {
      // avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      // avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      // avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      // avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      // avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      // avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - August 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              {/* <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton> */}
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
              datasets: [
                {
                  label: 'Monthly Sales',
                  backgroundColor: hexToRgba('#63c2de', 10),
                  borderColor: '#63c2de',
                  pointHoverBackgroundColor: '#63c2de',
                  borderWidth: 2,
                  data: monthlyData, // Use the fetched monthly data here
                  fill: true,
                },
                // {
                //   label: 'My Third dataset',
                //   backgroundColor: 'transparent',
                //   borderColor: '#f86c6b',
                //   pointHoverBackgroundColor: '#f86c6b',
                //   borderWidth: 1,
                //   borderDash: [8, 5],
                //   data: [65, 65, 65, 65, 65, 65, 65, 65],
                // },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>

      

      <div>
        <h2>Tổng giá trị tồn kho: {formattedPriceInventory}</h2>
        <h2>Doanh thu: {formattedTotalPrice}</h2>
        <h2>Tổng sản phẩm đã nhập vào: {quantity} Đôi</h2>
        <h2>Số sản phẩm đã bán ra: {quantityOut} Đôi</h2>
      </div>
    </>
  );
};

export default Dashboard;
