export interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}
export const TabPanel = (props: TabPanelProps) => {
    const { children, value: selectedTabIndex, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={selectedTabIndex !== index}
            id={`simple-tabpanel-${index}`}
            style={{ width: '100%' }}
            {...other}
        >
            { (selectedTabIndex === index) && children }
        </div>
    )
}
