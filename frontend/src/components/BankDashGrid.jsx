import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ClusteredBarChart from './ClusteredBarChart';
import NewApplicationMenu from './NewApplicationMenu';
import Table from './Table';
import { categoryContext } from '../contexts/categoryContext';
import TablePL from './TablePL';
const BankDashGrid = () => {
  const { category, setCategory } = useContext(categoryContext);
  const [applications, setApplications] = useState([]);
  const [emails, setEmails] = useState([
    {
      Sender: 'Bank of America',
      Content: 'Sit down',
      Time: '11:11 AM',
    },
  ]);
  const [businessLoans, setBusinessLoans] = useState([]);

  const he = ['Application Type', 'Application ID', 'Name of Applicant', 'Date', 'Azure ML score'];
  const emailHeaders = ['Sender', 'Content', 'Time'];
  const businessLoanHeaders = ['Application ID', 'Company Name', 'Auditing Company Name',  'Date And Time','ML Score' ];
  const emailCategories = ['Category 1', 'Category 2', 'Category 3'];

  useEffect(() => {
    if (category === 'Applications') {
      axios.get('https://bobcyberwardenfinal.azurewebsites.net/personalloan/all_loans')
        .then(response => {
          const fetchedApplications = response.data.map(application => ({
            'Application Type': application.Type_of_Loan,
            'Application ID': application.Application_id,
            'Name of Applicant': application.Name,
            'Date': new Date(application.Applied_date_time).toLocaleDateString(),
            'Azure ML Score': application.Result,
          }));
          setApplications(fetchedApplications);
        })
        .catch(error => {
          console.error('Error fetching applications:', error);
        });
    } else if (category === 'Business Loans') {
      axios.get('https://bobcyberwardenfinal.azurewebsites.net/bussinessloan/all_loans')
        .then(response => {
          const fetchedBusinessLoans = response.data.map(loan => ({
            'Application ID': loan.application_id,
            'Company Name': loan.company_name,
            'Auditing Company Name': loan.auditing_company_name,
            "Date And Time" : loan.created_at,
            'ML Score': loan.result
            
          }));
          setBusinessLoans(fetchedBusinessLoans);
        })
        .catch(error => {
          console.error('Error fetching business loans:', error);
        });
    }
  }, [category]);

  return (
    <div className='grid grid-cols-12 gap-3 mx-10 mt-2'>
      <div className='bg-white col-span-4 rounded-md p-5 flex flex-col'>
        <div className='font-bold text-xl'>Overview</div>
        <div className='text-[#666666]'>Employee ID: 123456789</div>
        <div className='text-4xl mt-5'>1096</div>
        <div className='text-[#666666]'>Total Applications</div>

        <div className='mt-5 flex flex-col'>
          <div className='flex justify-between border-b py-2'>
            <div className='mr-20'>New Applications</div>
            <div className='font-bold text-[#008000]'>+200</div>
          </div>
          <div className='flex justify-between border-b py-2'>
            <div className='mr-20'>Pending Applications</div>
            <div className='font-bold text-[#008000]'>+100</div>
          </div>
          <div className='flex justify-between border-b py-2'>
            <div className='mr-20'>Replied</div>
            <div className='font-bold text-[#008000]'>+300</div>
          </div>
        </div>
      </div>

      <div className='bg-white col-span-8 rounded-md p-4 flex flex-col'>
        <div className='font-bold text-xl'>Application Statistics</div>
        <div className='text-[#666666]'>Understand patterns of incoming statistics</div>
        <div>
          <ClusteredBarChart />
        </div>
      </div>

      <div className='bg-white col-span-3 rounded-md flex flex-col p-4'>
        <div className='font-bold text-xl'>Quick Links</div>
        <div className='text-[#666666]'>Navigate between your actions</div>
        <button className='bg-gray-200 text-left px-4 font-bold text-black py-3 mt-3 hover:bg-black hover:text-white rounded-md'>
          DataChat
        </button>
        <button className='bg-gray-200 text-left px-4 font-bold text-black py-3 mt-3 hover:bg-black hover:text-white rounded-md' onClick={() => {
          setCategory('Applications');
        }}>
          Personal Loan
        </button>
        <button className='bg-gray-200 text-left px-4 font-bold text-black py-3 mt-3 hover:bg-black hover:text-white rounded-md'>
          Logout
        </button>
        <button className='bg-gray-200 text-left px-4 font-bold text-black py-3 mt-3 hover:bg-black hover:text-white rounded-md' onClick={() => setCategory('Business Loans')}>
          Business Loan
        </button>
      </div>

      <div className='bg-white col-span-9 rounded-md flex flex-col p-4'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <div className='font-bold text-xl'>{category}</div>
            <div className='text-[#666666]'>Keep track of your bank {category} here</div>
          </div>

          <div className='search flex justify-center'>
            <input className='bg-gray-200 w-96 py-3 px-3 rounded-l' placeholder={`Search ${category}...`} />
            <button className='bg-[#FF5B2E] py-3 px-3 rounded-r hover:bg-black hover:text-white hover:font-bold'>🔎</button>
          </div>
        </div>

        {category === 'Emails' ? (
          <div className='flex justify-start mt-3'>
            {emailCategories.map((cat, index) => (
              <button key={index} className='bg-white text-black border border-black hover:bg-black hover:text-white hover:font-bold py-1 px-4 mr-3 rounded'>{cat}</button>
            ))}
          </div>
        ) : null}

        {category === 'Applications' && <TablePL header={he} content={applications} />}

        {category === 'Emails' && <Table header={emailHeaders} content={emails} />}
        {category === 'Business Loans' && <Table header={businessLoanHeaders} content={businessLoans} linkColumn="Application ID" />}
      </div>
    </div>
  );
}

export default BankDashGrid;
