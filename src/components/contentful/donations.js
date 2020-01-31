const donations = {
  fields: {
    companyOrIndividual: {
      'en-US': '',
    },
    name: {
      'en-US': this.transaction.payer.name,
    },
    phone: {
      'en-US': '',
    },
    email: {
      'en-US': this.transaction.payer.email,
    },
    address: {
      'en-US': '',
    },
    city: {
      'en-US': '',
    },
    state: {
      'en-US': '',
    },
    zip: {
      'en-US': '',
    },
    specialMessage: {
      'en-US': '',
    },
    amount: {
      'en-US': this.transaction.amount,
    },
    createdTime: this.transaction.created,
    payerId: {
      'en-US': this.transaction.payer.id,
    },
    paymentId: {
      'en-US': this.transaction.id,
    },
  }
}

export default donations
