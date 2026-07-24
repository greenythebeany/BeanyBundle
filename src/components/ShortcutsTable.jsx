import { useLang } from '../contexts/LangContext.jsx';

export function ShortcutsTable({ shortcuts }) {
  const { t } = useLang();
  return (
    <table className="kbd-table">
      <tbody>
        <tr>
          <th>{t('shortcuts.key')}</th>
          <th>{t('shortcuts.action')}</th>
        </tr>
        {shortcuts.map((row, i) => (
          <tr key={i}>
            <td>
              {row.keys.map((k, j) => (
                <span key={j}>
                  {j > 0 && (row.sep ?? ' / ')}
                  <kbd>{k}</kbd>
                </span>
              ))}
            </td>
            <td>{row.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
