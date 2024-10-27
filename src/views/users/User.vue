<template>
  <div class="bg-gray-50 min-h-screen p-8">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0"
      >
        <div class="flex justify-between items-center w-full">
          <h1 class="text-2xl font-semibold">All Customers</h1>
        </div>
        <div class="flex items-center space-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            class="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto"
          />
          <select
            class="border border-gray-300 rounded-md px-3 py-2 text-gray-600"
          >
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
          </select>
        </div>
      </div>

      <!-- Table Wrapper for Horizontal Scroll -->
      <div class="overflow-x-auto">
        <table
          class="w-full bg-white border border-gray-200 rounded-lg min-w-max"
        >
          <thead>
            <tr class="text-left text-gray-500 text-sm uppercase">
              <th class="px-4 py-3">Customer Name</th>
              <th class="px-4 py-3 hidden md:table-cell">Company</th>
              <th class="px-4 py-3">Phone Number</th>
              <th class="px-4 py-3 hidden lg:table-cell">Email</th>
              <th class="px-4 py-3 hidden xl:table-cell">Country</th>
              <th class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="customer in customers"
              :key="customer.email"
              class="text-gray-700"
            >
              <td class="border-t px-4 py-3">{{ customer.name }}</td>
              <td class="border-t px-4 py-3 hidden md:table-cell">
                {{ customer.company }}
              </td>
              <td class="border-t px-4 py-3">{{ customer.phone }}</td>
              <td class="border-t px-4 py-3 hidden lg:table-cell">
                {{ customer.email }}
              </td>
              <td class="border-t px-4 py-3 hidden xl:table-cell">
                {{ customer.country }}
              </td>
              <td class="border-t px-4 py-3">
                <span
                  :class="
                    customer.status === 'Active'
                      ? 'bg-green-100 text-green-500'
                      : 'bg-red-100 text-red-500'
                  "
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {{ customer.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customers: [
        {
          name: 'Jane Cooper',
          company: 'Microsoft',
          phone: '(225) 555-0118',
          email: 'jane@microsoft.com',
          country: 'United States',
          status: 'Active',
        },
        {
          name: 'Floyd Miles',
          company: 'Yahoo',
          phone: '(205) 555-0100',
          email: 'floyd@yahoo.com',
          country: 'Kiribati',
          status: 'Inactive',
        },
        {
          name: 'Ronald Richards',
          company: 'Adobe',
          phone: '(302) 555-0107',
          email: 'ronald@adobe.com',
          country: 'Israel',
          status: 'Inactive',
        },
        {
          name: 'Marvin McKinney',
          company: 'Tesla',
          phone: '(252) 555-0126',
          email: 'marvin@tesla.com',
          country: 'Iran',
          status: 'Active',
        },
        {
          name: 'Jerome Bell',
          company: 'Google',
          phone: '(629) 555-0129',
          email: 'jerome@google.com',
          country: 'Réunion',
          status: 'Active',
        },
        {
          name: 'Kathryn Murphy',
          company: 'Microsoft',
          phone: '(406) 555-0120',
          email: 'kathryn@microsoft.com',
          country: 'Curaçao',
          status: 'Active',
        },
      ],
    }
  },
}
</script>

<style scoped>
/* Optional: Custom styles for finer control */
</style>
