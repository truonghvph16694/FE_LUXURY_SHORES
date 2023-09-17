import React, { useState, useEffect } from 'react';
import {
  CAvatar,
  CCard,
  CCardBody,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { hexToRgba } from '@coreui/utils';
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
  const [totalPriceSum, setTotalPriceSum] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [quantityOut, setQuantityOut] = useState(0);
  const [priceInventory, setPriceInventory] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [annualData, setAnnualData] = useState([]);

  const fetchTotal_price = async () => {
    try {
      const list = await ordersApi.GetAll(); // Assuming this returns an array of objects

      const filteredList = list.filter((order) => order.status === 3);

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

      const filteredOrders = ordersData.filter((order) => order.status === 3);

      const sum = filteredOrders.reduce((acc, order) => {
        const orderQuantities = order.product.map((product) => product.quantity);
        const orderSum = orderQuantities.reduce(
          (orderAcc, orderQuantity) => orderAcc + orderQuantity,
          0
        );
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

      const sum = data.reduce((acc, record) => {
        const entryQuantities = record.product_entries.map(
          (entry) => entry.quantity
        );
        const entrySum = entryQuantities.reduce(
          (entryAcc, entryQuantity) => entryAcc + entryQuantity,
          0
        );
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

      const sum = productsData.reduce((acc, product) => {
        const productTotalPrice = product.product_entries.reduce(
          (entryAcc, entry) => {
            return entryAcc + entry.quantity * product.price;
          },
          0
        );
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

      ordersData.forEach((order) => {
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
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      // Create an array of data for the chart
      const chartData = months.map((month) => {
        const yearMonth = `${new Date().getFullYear()}-${months.indexOf(month) + 1}`;
        return ordersByMonth[yearMonth] || 0; // If data doesn't exist for the month, set it to 0
      });

      setMonthlyData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAnnualRevenue = async () => {
    try {
      const ordersData = await ordersApi.GetAll(); // Assuming this returns an array of objects

      const ordersByYear = {};

      ordersData.forEach((order) => {
        if (order.status === 3) {
          const createdAt = new Date(order.created_at);
          const year = createdAt.getFullYear();

          if (!ordersByYear[year]) {
            ordersByYear[year] = 0;
          }

          ordersByYear[year] += order.total_price;
        }
      });

      const years = Object.keys(ordersByYear);
      const annualRevenueData = years.map((year) => ordersByYear[year]);

      setAnnualData(annualRevenueData);
    } catch (error) {
      console.error('Error fetching annual revenue data:', error);
    }
  };

  useEffect(() => {
    fetchTotal_price();
    total_quantity();
    fetch_quantity_out();
    fetch_price_inventory();
    fetchOrdersByMonth();
    fetchAnnualRevenue();
  }, []);

  const formattedTotalPrice = totalPriceSum.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const formattedPriceInventory = priceInventory.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="border border-gray-300 p-4 bg-yellow-300">
          <h2 className="text-xl">Tổng giá trị tồn kho
            <br />
            <span>  {formattedPriceInventory}</span>
          </h2>
        </div>
        <div className="border border-gray-300 p-4 bg-blue-400">
          <h2 className="text-xl">Doanh thu:
            <br />
            <span> {formattedTotalPrice}</span>
          </h2>
        </div>
        <div className="border border-gray-300 p-4 bg-pink-300">
          <h2 className="text-xl">Tổng sản phẩm đã nhập vào
            <br />
            <span> {quantity}</span> Đôi
          </h2>
        </div>
        <div className="border border-gray-300 p-4 bg-green-400">
          <h2 className="text-xl">Số sản phẩm đã bán ra
            <br />
            <span>{quantityOut}</span> Đôi
          </h2>
        </div>
      </div>
      <CCard className="mb-4 mt-8">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h1 id="traffic" className="card-title mb-0 text-center font-bold text-2xl">
                Doanh Thu Tháng
              </h1>
              <br />
              <div className="small text-medium-emphasis">January - December 2023</div>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ],
              datasets: [
                {
                  label: 'Monthly Sales',
                  backgroundColor: hexToRgba('#63c2de', 10),
                  borderColor: '#63c2de',
                  pointHoverBackgroundColor: '#63c2de',
                  borderWidth: 2,
                  data: monthlyData,
                  fill: true,
                },
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
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h1 id="annual-traffic" className="card-title mb-0 text-center font-bold text-2xl">
                Doanh Thu Hàng Năm
              </h1>
              <br />
              <div className="small text-medium-emphasis">2023</div>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['2022', '2023'],
              datasets: [
                {
                  label: 'Annual Sales',
                  backgroundColor: hexToRgba('#63c2de', 10),
                  borderColor: '#63c2de',
                  pointHoverBackgroundColor: '#63c2de',
                  borderWidth: 2,
                  data: annualData,
                  fill: true,
                },
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
    </>
  );
};

export default Dashboard;
