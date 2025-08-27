package seraph.GJLeague.scoreBoard.Utils.APP_UPDATER_FIREBASE;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;


import seraph.GJLeague.scoreBoard.R;

public class Firebase_GAS_Updater {

    private final Context context;

    /** Works via this Google App Script
     * @link <a href="https://script.google.com/home/projects/1zX0ONSVQ_tskek_5RjremAD2fwANHBJio6hsUngUXbsVdREo8c_H_oIK/edit">...</a>
     */
    public Firebase_GAS_Updater(Context context) {
        this.context = context;
    }

    public void checkAppVersion() {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference versionRef = database.getReference("app/version/latest_version");

        versionRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists()) {
                    String versionStr = snapshot.getValue(String.class); // read as String
                    int latestVersion = 0;
                    try {
                        latestVersion = Integer.parseInt(versionStr); // convert to int
                    } catch (NumberFormatException e) {
                        e.printStackTrace();
                    }

                    Log.e("Firebase_GAS_Updater", "Latest version: " + latestVersion);
                    Log.e("Firebase_GAS_Updater", "Current version: " + getAppVersionCode());
                    int currentVersion = getAppVersionCode();
                    if (currentVersion < latestVersion) {
                        showUpdateDialog();
                    }
                } else {
                   Log.e("Firebase_GAS_Updater", "Version info not found in database.");
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
                Log.e("Firebase_GAS_Updater", "Failed to read version: " + error.getMessage());


            }
        });
    }

    private int getAppVersionCode() {
        try {
            return context.getPackageManager()
                    .getPackageInfo(context.getPackageName(), 0)
                    .versionCode;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }


    private void showUpdateDialog() {
        new AlertDialog.Builder(context)
                .setTitle(context.getString(R.string.update_available))
                .setMessage(context.getString(R.string.update_available_message))
                .setCancelable(false) // User cannot dismiss by tapping outside
                .setPositiveButton(context.getString(R.string.update_now), (dialog, which) -> {
                    openPlayStore();
                    dialog.cancel();
                })
                .show();
    }

    private void openPlayStore() {
        final String appPackageName = context.getPackageName();
        try {
            context.startActivity(new Intent(Intent.ACTION_VIEW,
                    Uri.parse("market://details?id=" + appPackageName)));
        } catch (android.content.ActivityNotFoundException e) {
            // If Play Store app is not available, open in browser
            context.startActivity(new Intent(Intent.ACTION_VIEW,
                    Uri.parse("https://play.google.com/store/apps/details?id=" + appPackageName)));
        }
    }
}
