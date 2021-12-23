import React from 'react'
import { connect } from 'react-redux'
import { getCustomers } from '../../actions/admin'

const AffiliateCustomers = ({ affiliateID, getCustomers, customers }) => {

  React.useEffect(() => {
    getCustomers(affiliateID)
  }, [getCustomers, affiliateID])

  const [pageCustomers, setPageCustomers] = React.useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [maxPageNumber, setMaxPageNumber] = React.useState(1)

  React.useEffect(() => {
    setPageCustomers(customers.sort((element1, element2) => { return new Date(element2.date) - new Date(element1.date) }).slice((pageNumber - 1) * 5, pageNumber * 5))
    setMaxPageNumber(Math.ceil(customers.length / 12))
  }, [customers, pageNumber])

  const nextPage = () => {
    if (pageNumber + 1 > maxPageNumber) {
      lastPage()
      return
    }
    setPageNumber(pageNumber + 1)
  }

  const prevPage = () => {
    if (pageNumber - 1 < 1) {
      firstPage()
      return
    }
    setPageNumber(pageNumber - 1)
  }

  const firstPage = () => {
    setPageNumber(1)
  }

  const lastPage = () => {
    setPageNumber(maxPageNumber)
  }

  return (
    <div className='admin-customers'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='font-36 pt-3'>Customers</div>
        </div>
        <div className='col-lg-6'>
          <div className='text-right pt-4'>
            <select
              type='text'
              className='search-filter'
            >
              <option>All</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
            <input
              type='text'
              className='search-filter'
              placeholder='Search'
            />
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='table-responsive bg-white keto-rounded-lg keto-shadow'>
            <table className='table'>
              <thead className='thead-light'>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>sales</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((item, index) =>
                  <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>$1,541.52</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='text-center pt-3'>
            {(pageNumber - 1) * 5 + 1} - {(pageNumber - 1) * 5 + pageCustomers.length} of {customers.length}
          </div>
          <div className='text-center pt-1'>
            <i onClick={() => firstPage()} className="material-icons">first_page</i>
            <i onClick={() => prevPage()} className="material-icons">navigate_before</i>
            <i onClick={() => nextPage()} className="material-icons">navigate_next</i>
            <i onClick={() => lastPage()} className="material-icons">last_page</i>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  affiliateID: state.auth.user._id,
  customers: state.admin.customers
})

export default connect(mapStateToProps, { getCustomers })(AffiliateCustomers)