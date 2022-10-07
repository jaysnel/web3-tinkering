import React from 'react'

export default function WalletInstalled(props) {
  const { walletInstalled } = props
  const description = walletInstalled ? 'Wallet Installed' : 'No Wallet Installed'

  return (
    <p>
        {description}
    </p>
  )
}
