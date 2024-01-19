package seraph.GJLeague.scoreBoard;

import android.accounts.AccountManager;
import android.content.Intent;
import android.content.IntentSender;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.UpdateAvailability;
import com.google.android.play.core.tasks.OnSuccessListener;
import com.google.android.play.core.tasks.Task;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    private AppUpdateManager mAppUpdateManager;
    private static final int RC_APP_UPDATE=100;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                bridge.triggerWindowJSEvent("MyPushEvent", "{\"test1\":\"test2\"}");
            }
        }, 3000);


        sendMessageToWebView();

        //Update setttings
        mAppUpdateManager = AppUpdateManagerFactory.create(this);
        Task<AppUpdateInfo> appUpdateInfoTask = mAppUpdateManager.getAppUpdateInfo();


        mAppUpdateManager.getAppUpdateInfo().addOnSuccessListener(new OnSuccessListener<AppUpdateInfo>() {
            @Override
            public void onSuccess(AppUpdateInfo result) {
                if(result.updateAvailability()== UpdateAvailability.UPDATE_AVAILABLE
                        && result.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE))
                {
                    try {
                        mAppUpdateManager.startUpdateFlowForResult(result,AppUpdateType.IMMEDIATE,MainActivity.this,
                                RC_APP_UPDATE);
                    } catch (IntentSender.SendIntentException exception) {
                        exception.printStackTrace();
                    }
                }
            }
        });
        // Set an OnKeyListener to capture the back key press
        findViewById(android.R.id.content).setOnKeyListener((v, keyCode, event) -> {
            if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_UP) {
                finishAffinity();
                return true; // Consume the event
            }
            return false; // Let the system handle other key events
        });
    }



    // must update or don't use my app
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        /*TODO// FOR THE APP UPDATE STATUS*/
        if(requestCode==RC_APP_UPDATE && resultCode!= RESULT_OK)
        {
            Toast.makeText(this, "You can't continue without Update!\nGod Bless You~!", Toast.LENGTH_SHORT).show();
            Toast.makeText(MainActivity.this, "New Version Available~", Toast.LENGTH_LONG).show();
            Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=seraph.GJLeague.scoreBoard"));
            startActivity(i);
            finish();
            super.onBackPressed();
        }

        super.onActivityResult(requestCode, resultCode, data);

    }


    private void sendMessageToWebView() {
        Bridge bridge = this.getBridge();

        if (bridge != null) {
            JSObject message = new JSObject();
            message.put("variableName", "someVariable");
            message.put("variableValue", "someValue");

            // Send the message to the WebView by executing JavaScript code
            bridge.triggerWindowJSEvent("MyPushEvent", "{\"test1\":\"test2\"}");
            bridge.triggerDocumentJSEvent("MyPushEvent");
            bridge.eval("window.dispatchEvent(new CustomEvent('message', { detail: " + message.toString() + " }))", null);
        }
    }
}
